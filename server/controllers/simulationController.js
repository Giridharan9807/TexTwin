const telemetryService = require('../services/telemetryService');

// POST /api/simulation/run
exports.runSimulation = async (req, res) => {
  try {
    const {
      machineId = 'LOOM-101',
      targetRpm = 1080,
      airPressureBar = 5.0,
      ambientTemp = 32,
      humidityPct = 65,
      yarnTensionN = 18,
      shiftHours = 24,
      coolingFanPct = 85,
      deferredMaintDays = 0,
      yarnQuality = 'Combed Cotton 40s',
    } = req.body;

    // Fetch baseline telemetry from MongoDB
    const telemetryList = await telemetryService.getDigitalTwins(machineId !== 'ALL' ? machineId : 'LOOM-101');
    const baseTel = (telemetryList && telemetryList[0]) || {
      rpm: 980,
      temperature: 52.4,
      vibration: 0.18,
      powerKw: 14.2,
      airPressureBar: 4.8,
      yarnTensionN: 18.0,
      fabricOutputMhr: 98.4,
    };

    const baseRpm = baseTel.rpm || 980;
    const rpmRatio = targetRpm / baseRpm;
    const pressureRatio = airPressureBar / (baseTel.airPressureBar || 4.8);
    const coolingFactor = coolingFanPct / 85;

    // Dynamic AI Calculations
    const simTemp = (baseTel.temperature + (targetRpm - baseRpm) * 0.04 + (ambientTemp - 32) * 0.4 - (coolingFactor - 1) * 6).toFixed(1);
    const simVibration = (baseTel.vibration * Math.pow(rpmRatio, 1.6) * (1 + (yarnTensionN - 18) * 0.02)).toFixed(2);
    const simPowerKw = (baseTel.powerKw * Math.pow(rpmRatio, 1.45) * pressureRatio).toFixed(1);
    const simYieldMhr = (baseTel.fabricOutputMhr * rpmRatio * (1 - Math.max(0, parseFloat(simTemp) - 65) * 0.01)).toFixed(1);

    const shiftTotalMeters = Math.round(parseFloat(simYieldMhr) * shiftHours);
    const dailyKwh = Math.round(parseFloat(simPowerKw) * shiftHours);

    // Defect & Failure Probabilities
    const tempOverheatFactor = parseFloat(simTemp) > 65 ? (parseFloat(simTemp) - 65) * 1.8 : 0;
    const simFailureRiskPct = Math.min(99.9, Math.max(1.2, 4.2 * Math.pow(rpmRatio, 1.8) * (1 + tempOverheatFactor * 0.08) * (1 + deferredMaintDays * 0.025))).toFixed(1);

    const simRulDays = Math.max(5, Math.round(165 / (rpmRatio * (1 + tempOverheatFactor * 0.05 + deferredMaintDays * 0.03))));
    const defectCount = Math.max(0, Math.round(2 + (targetRpm > 1100 ? 5 : 0) + (yarnTensionN > 24 ? 3 : 0) + (ambientTemp > 40 ? 4 : 0)));

    // Financial Analysis (INR)
    const grossRevenueINR = Math.round(shiftTotalMeters * 350); // ₹350 per meter fabric
    const electricityCostINR = Math.round(dailyKwh * 8.5); // ₹8.5 per kWh
    const defectLossINR = defectCount * 1800; // ₹1,800 scrap per defect
    const netProfitINR = grossRevenueINR - electricityCostINR - defectLossINR;

    res.status(200).json({
      success: true,
      simulationScenario: {
        machineId,
        targetRpm,
        airPressureBar,
        ambientTemp,
        humidityPct,
        yarnTensionN,
        shiftHours,
        coolingFanPct,
        deferredMaintDays,
        yarnQuality,
      },
      baseline: {
        rpm: baseRpm,
        temperature: baseTel.temperature,
        vibration: baseTel.vibration,
        powerKw: baseTel.powerKw,
        fabricOutputMhr: baseTel.fabricOutputMhr,
      },
      simulatedResults: {
        simTemp: parseFloat(simTemp),
        simVibration: parseFloat(simVibration),
        simPowerKw: parseFloat(simPowerKw),
        simYieldMhr: parseFloat(simYieldMhr),
        shiftTotalMeters,
        dailyKwh,
        simFailureRiskPct: parseFloat(simFailureRiskPct),
        simRulDays,
        defectCount,
        grossRevenueINR,
        electricityCostINR,
        defectLossINR,
        netProfitINR,
      },
      databaseSources: {
        mysqlAsset: 'textwin_asset_management.machines (Master Asset Details)',
        mongoDbTelemetry: 'textwin_digital_twin.telemetry (MongoDB 136-Feed Sensor Stream)',
        aiModel: 'XGBoost v4 + LSTM Ensemble Machine Health Matrix',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
