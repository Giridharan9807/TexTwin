const telemetryService = require('../services/telemetryService');

exports.getDigitalTwin = async (req, res) => {
  try {
    const data = await telemetryService.getDigitalTwins();
    res.status(200).json({ success: true, count: data.length, data, source: 'MongoDB textwin_digital_twin.digitalTwin' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDigitalTwinByMachineId = async (req, res) => {
  try {
    const machineId = req.params.machineId || 'LOOM-201';
    const data = await telemetryService.getDigitalTwins(machineId);
    
    // Provide full Digital Twin payload matching requirements
    const twinPayload = {
      machineId,
      assetName: `Air Jet Loom ${machineId}`,
      manufacturer: 'Dornier',
      model: 'HD-2025',
      installedYear: 2024,
      location: 'Plant A',
      department: 'Weaving',
      twinStatus: {
        syncPct: 99.8,
        lastSync: '1 sec ago',
        latencyMs: 32,
        mqttState: 'Connected',
        twinState: 'Healthy',
      },
      mqttDetails: {
        topic: `textwin/telemetry/${machineId}`,
        lastMessage: new Date().toLocaleTimeString(),
        qos: 1,
        packets: 2543,
        latencyMs: 24,
      },
      energy: {
        powerKw: 6.5,
        todayEnergyKwh: 126,
        efficiencyPct: 96,
      },
      components: [
        { name: 'Bearing', status: 'normal', color: '#22C55E', temp: '54.2°C', rpm: 1050, vibration: '0.18 mm/s', health: '96%', lastMaint: '15 Jul 2026' },
        { name: 'Motor', status: 'warning', color: '#EF4444', temp: '82.4°C', rpm: 1080, vibration: '0.34 mm/s', health: '68%', lastMaint: '10 Jun 2026' },
        { name: 'Air Nozzle', status: 'caution', color: '#F59E0B', temp: '48.0°C', rpm: 1050, vibration: '0.12 mm/s', health: '85%', lastMaint: '01 Jul 2026' },
        { name: 'Warp Beam', status: 'normal', color: '#22C55E', temp: '38.5°C', rpm: 980, vibration: '0.08 mm/s', health: '98%', lastMaint: '20 May 2026' },
        { name: 'Weft Sensor', status: 'critical', color: '#EF4444', temp: '41.2°C', rpm: 1050, vibration: '0.22 mm/s', health: '62%', lastMaint: '12 Jul 2026' },
      ],
      events: [
        { time: '10:40', text: 'Maintenance Scheduled for Motor Drive Shaft' },
        { time: '10:35', text: 'Engineer Assigned: Rajesh Kumar' },
        { time: '10:32', text: 'AI Prediction Generated: 82% Failure Probability' },
        { time: '10:25', text: 'Bearing Fatigue Warning Threshold Exceeded' },
        { time: '10:20', text: 'Temperature Increased above 80.0°C' },
      ],
      aiPrediction: {
        healthScore: 68,
        failureProbability: 82,
        remainingUsefulLifeHours: 34,
        recommendation: 'Replace Drive Shaft Bearing within 12 hrs',
        rootCause: 'Bearing Fatigue & Thermal Friction',
        confidenceScore: 96,
      },
      maintenanceHistory: {
        lastMaintenanceDate: '15 Jul 2026',
        lastTask: 'Bearing Replacement & Lube Calibration',
        engineer: 'Rajesh Kumar',
        nextMaintenanceDate: '15 Aug 2026',
      },
      telemetry: data[0] || { rpm: 1050, temperature: 54.2, vibration: 0.18, airPressureBar: 4.8, powerKw: 6.5, yarnTensionN: 18 },
    };

    res.status(200).json({ success: true, machineId, data: twinPayload });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getEventsByMachineId = async (req, res) => {
  try {
    const machineId = req.params.machineId || 'LOOM-201';
    const events = [
      { time: '10:40', text: 'Maintenance Scheduled for Motor Drive Shaft' },
      { time: '10:35', text: 'Engineer Assigned: Rajesh Kumar' },
      { time: '10:32', text: 'AI Prediction Generated: 82% Failure Probability' },
      { time: '10:25', text: 'Bearing Fatigue Warning Threshold Exceeded' },
      { time: '10:20', text: 'Temperature Increased above 80.0°C' },
    ];
    res.status(200).json({ success: true, machineId, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
