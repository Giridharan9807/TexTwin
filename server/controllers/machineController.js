const Machine = require('../models/Machine');
const { getIsConnected, getMockStore, addActivityLog } = require('../config/db');

// In-memory problem store fallback per machine
const customProblemsMap = {};

// Dictionary of realistic root cause problem reasons per machine ID (all 20 looms)
const loomProblemReasons = {
  'LOOM-101': 'Main nozzle air pressure dip below 4.2 bar causing yarn mis-picks',
  'LOOM-102': 'Rapier tape drive belt tension slack resulting in warp shed clearance delay',
  'LOOM-103': 'Dobby selector solenoid coil thermal fluctuation during high-speed cycle',
  'LOOM-104': 'Pump nozzle filter clogging due to mineral scale build-up in recycled water feed',
  'LOOM-105': 'Jacquard harness cord friction spike on hook #1024',
  'LOOM-201': 'Drive shaft bearing race fatigue causing high frequency vibration (>3.8 mm/s)',
  'LOOM-202': 'Weft accumulator optical sensor dust accumulation causing false stops',
  'LOOM-203': 'Main drive V-belt micro-slippage during rapid acceleration phase',
  'LOOM-301': 'Sub-nozzle valve #4 solenoid response delay during heavy denim insertion',
  'LOOM-302': 'Warp beam let-off brake shoe lining wear leading to yarn tension looseness',
  'LOOM-303': 'Water pressure regulator diaphragm micro-leak in high-pressure supply line',
  'LOOM-401': 'Electronic control module heat sink dust blockage raising operating temp',
  'LOOM-402': 'Harness return spring tension reduction on bay 2 Jacquard hook set',
  'LOOM-501': 'Air jet main valve optical sensor calibration drift',
  'LOOM-502': 'Organic cotton warp yarn micro-fuzz accumulation on reed teeth',
  'LOOM-601': 'Synthetic filament water jet pressure pulse variation',
  'LOOM-602': 'Rapier gripper alignment micro-shift on right insertion side',
  'LOOM-603': 'Technical mesh shedding frame guide rail lube dryness',
  'LOOM-604': 'Dobby jet solenoid driver heat dissipation fan slow speed',
  'LOOM-605': 'Heavy rapier connect drive shaft oil filter differential pressure alert',
};

// Helper to enrich a machine object with ALL 13 Live Telemetry & Operational Metrics
const enrichMachineDetails = (machine) => {
  const isRunning = machine.currentStatus === 'Running';
  const isMaint = machine.currentStatus === 'Maintenance';
  const isIdle = machine.currentStatus === 'Idle';

  const healthScore = machine.healthScore || (isRunning ? 96 : isMaint ? 65 : 88);
  const defaultReason = loomProblemReasons[machine.machineId] || 'Routine operational friction and thermal variation';

  // 13 Mandatory Operational Telemetry Metrics
  const rpm = isRunning ? Math.floor(Math.random() * 100 + 950) : 0;
  const temperature = isRunning ? (Math.random() * 8 + 52).toFixed(1) : (Math.random() * 5 + 32).toFixed(1);
  const vibration = isRunning ? (Math.random() * 1.2 + 1.4).toFixed(2) : '0.10';
  const powerKw = isRunning ? (Math.random() * 3 + 12.5).toFixed(1) : '1.2';
  const motorCurrentA = isRunning ? (Math.random() * 5 + 26.0).toFixed(1) : '2.1';
  const humidity = (Math.random() * 8 + 62).toFixed(1);
  const airPressureBar = isRunning ? (Math.random() * 0.8 + 4.5).toFixed(1) : '0.0';
  const yarnTensionN = isRunning ? (Math.random() * 3 + 17.5).toFixed(1) : '0.0';
  const fabricOutputMhr = isRunning ? (Math.random() * 8 + 94.0).toFixed(1) : '0.0';
  const defectCount = isMaint ? 14 : isIdle ? 5 : 2;
  const runningHours = Math.floor(Math.random() * 500 + 3800);
  const failureRiskPct = Math.max(2, 100 - healthScore);
  const maintenanceDueDays = isMaint ? 0 : Math.floor(healthScore * 0.25);

  const baseProblems = isMaint
    ? [
        {
          id: 'p1',
          name: 'Drive Shaft Bearing & Vibration Anomaly',
          severity: 'High',
          rootCause: defaultReason,
          detectionTime: '2026-07-29 01:45 PM',
          sensorTriggered: 'Vibration Sensor VIB-04',
        },
      ]
    : isIdle
    ? [
        {
          id: 'p2',
          name: 'Standby / Material Reloading Pause',
          severity: 'Low',
          rootCause: 'Warp beam supply depleted; operator refilling yarn package',
          detectionTime: '2026-07-30 11:30 AM',
          sensorTriggered: 'Warp End Sensor TS-02',
        },
      ]
    : [
        {
          id: 'p3',
          name: 'Minor Telemetry Variation',
          severity: 'Normal',
          rootCause: defaultReason,
          detectionTime: '2026-07-30 09:15 AM',
          sensorTriggered: 'Optical Sensor OS-01',
        },
      ];

  const extraProblems = customProblemsMap[machine._id || machine.machineId] || [];

  return {
    ...machine,
    healthScore,
    problemReason: defaultReason,

    // Comprehensive 13 Operational Metrics
    telemetry: {
      temperature,
      vibration,
      rpm,
      powerKw,
      motorCurrentA,
      humidity,
      airPressureBar,
      yarnTensionN,
      fabricOutputMhr,
      defectCount,
      runningHours,
      failureRiskPct,
      maintenanceDueDays,
      runningSince: isRunning ? '2026-07-24 06:00 AM' : 'N/A',
      lastSensorUpdate: new Date().toISOString(),
    },

    idleInfo: isIdle
      ? {
          idleSince: '2026-07-30 11:30 AM',
          idleDuration: '3 hrs 15 mins',
          lastProductionTime: '2026-07-30 11:29 AM',
          reasonForIdle: 'Shift Change & Warp Beam Reloading',
          problemReason: 'Warp beam yarn depletion requiring manual threading',
        }
      : null,

    maintenanceDetails: isMaint
      ? {
          maintenanceType: 'Main Drive Motor & Bearing Overhaul',
          issueDescription: 'Vibration frequency anomaly (>3.8 mm/s) detected on main drive shaft',
          rootCause: defaultReason,
          engineer: machine.maintenanceEngineer || 'Anita Desai',
          startedOn: '2026-07-29 02:00 PM',
          estimatedCompletion: '2026-07-31 06:00 PM',
          priority: 'High',
          sparePartsRequired: ['SKF 6208 Deep Groove Bearing', 'Poly-V Drive Belt', 'Synthetic Grease ISO VG 220'],
          history: [
            {
              date: '2026-07-29',
              workPerformed: 'Disassembled main drive housing and uncoupled motor shaft',
              engineer: 'Anita Desai',
              cost: '$450',
              downtime: '18 hrs',
            },
            {
              date: '2026-05-15',
              workPerformed: 'Routine shedding motion lubrication and warp stop inspection',
              engineer: 'Karthik N',
              cost: '$120',
              downtime: '4 hrs',
            },
          ],
        }
      : {
          maintenanceType: 'Routine Preventive Service',
          issueDescription: 'Optimal operation; scheduled oil filter replacement due in 12 days',
          rootCause: defaultReason,
          engineer: machine.maintenanceEngineer || 'Anita Desai',
          startedOn: 'N/A',
          estimatedCompletion: 'N/A',
          priority: 'Normal',
          sparePartsRequired: ['Standard Lube Filter'],
          history: [
            {
              date: '2026-06-10',
              workPerformed: 'Full sensor recalibration and yarn tension check',
              engineer: 'Anita Desai',
              cost: '$180',
              downtime: '2 hrs',
            },
          ],
        },

    machineHealth: {
      healthScore,
      remainingUsefulLifeDays: Math.floor(healthScore * 1.8),
      aiPrediction: healthScore > 90 ? 'Healthy - Optimal Operation' : 'Warning - Maintenance Recommended',
      failureProbabilityPct: failureRiskPct,
    },

    currentProblems: [...extraProblems, ...baseProblems],

    eventTimeline: [
      { date: machine.createdAt || '2023-01-15', event: 'Asset Registered in TexTwin Digital Twin' },
      { date: machine.lastMaintenanceDate || '2026-06-10', event: 'Preventive Maintenance Completed' },
      { date: '2026-07-25', event: 'IoT Telemetry Gateway Re-Calibrated' },
      { date: machine.updatedAt || '2026-07-30', event: 'Current Telemetry Stream Active' },
    ],

    aiRecommendations: {
      immediateAction: isMaint
        ? `Resolve root cause: ${defaultReason}`
        : 'Inspect warp tension sensor optical lens and clean dust path',
      preventiveAction: 'Schedule spindle lubrication at next 500-hour milestone',
      estimatedRisk: healthScore > 90 ? 'Low (2%)' : 'Medium-High (24%)',
      recommendedInspectionDate: '2026-08-15',
    },
  };
};

// @desc    Get all machines
// @route   GET /api/machines
exports.getMachines = async (req, res) => {
  try {
    const { status, criticality, search, plant } = req.query;

    let machines = [];
    if (getIsConnected()) {
      let query = {};
      if (status) query.currentStatus = status;
      if (criticality) query.assetCriticality = criticality;
      if (plant && plant !== 'All') query.factoryName = plant;

      if (search) {
        query.$or = [
          { machineId: { $regex: search, $options: 'i' } },
          { assetName: { $regex: search, $options: 'i' } },
        ];
      }

      machines = await Machine.find(query).sort({ createdAt: -1 });
    } else {
      machines = getMockStore();
      if (status) {
        machines = machines.filter((m) => m.currentStatus?.toUpperCase() === status.toUpperCase());
      }
      if (criticality) {
        machines = machines.filter((m) => m.assetCriticality?.toUpperCase() === criticality.toUpperCase());
      }
      if (plant && plant !== 'All') {
        machines = machines.filter((m) => m.factoryName === plant);
      }
      if (search) {
        const term = search.toLowerCase();
        machines = machines.filter(
          (m) =>
            m.machineId?.toLowerCase().includes(term) ||
            m.assetName?.toLowerCase().includes(term)
        );
      }
    }

    const enriched = machines.map((m) =>
      enrichMachineDetails(m.toObject ? m.toObject() : m)
    );

    return res.status(200).json({
      success: true,
      count: enriched.length,
      data: enriched,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single machine by ID
// @route   GET /api/machines/:id
exports.getMachineById = async (req, res) => {
  try {
    const { id } = req.params;

    let machine = null;
    if (getIsConnected()) {
      machine = await Machine.findById(id);
      if (!machine) {
        machine = await Machine.findOne({ machineId: id });
      }
    } else {
      machine = getMockStore().find((m) => m._id === id || m.machineId === id);
    }

    if (!machine) {
      return res.status(404).json({ success: false, message: 'Machine asset not found' });
    }

    const plainObj = machine.toObject ? machine.toObject() : machine;
    const enriched = enrichMachineDetails(plainObj);

    return res.status(200).json({ success: true, data: enriched });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Record new machine problem / anomaly reason
// @route   POST /api/machines/:id/problems
exports.recordMachineProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, severity, rootCause, sensorTriggered, user } = req.body;

    if (!name || !rootCause) {
      return res.status(400).json({ success: false, message: 'Problem name and root cause reason are required' });
    }

    let machineKey = id;
    let machine = null;
    if (getIsConnected()) {
      machine = await Machine.findById(id) || await Machine.findOne({ machineId: id });
      if (machine) machineKey = machine._id.toString();
    } else {
      machine = getMockStore().find((m) => m._id === id || m.machineId === id);
      if (machine) machineKey = machine._id;
    }

    if (!machine) {
      return res.status(404).json({ success: false, message: 'Machine not found' });
    }

    const newProblem = {
      id: `p_${Date.now()}`,
      name,
      severity: severity || 'High',
      rootCause,
      detectionTime: new Date().toLocaleString(),
      sensorTriggered: sensorTriggered || 'Manual Maintenance Inspection',
    };

    if (!customProblemsMap[machineKey]) {
      customProblemsMap[machineKey] = [];
    }
    customProblemsMap[machineKey].unshift(newProblem);

    addActivityLog({
      type: 'edited',
      assetName: machine.assetName,
      machineId: machine.machineId,
      user: user || 'Anita Desai',
      details: `Logged problem: ${name} (${rootCause})`,
    });

    const plainObj = machine.toObject ? machine.toObject() : machine;
    const enriched = enrichMachineDetails(plainObj);

    return res.status(200).json({
      success: true,
      data: enriched,
      message: 'Problem reason recorded successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new machine
// @route   POST /api/machines
exports.createMachine = async (req, res) => {
  try {
    const machineData = req.body;

    if (!machineData.machineId || !machineData.assetName) {
      return res.status(400).json({ success: false, message: 'Machine ID and Asset Name are required' });
    }

    let newMachine = null;
    if (getIsConnected()) {
      const existing = await Machine.findOne({ machineId: machineData.machineId });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Machine ID already exists' });
      }

      newMachine = await Machine.create(machineData);
    } else {
      const mockStore = getMockStore();
      if (mockStore.some((m) => m.machineId === machineData.machineId)) {
        return res.status(400).json({ success: false, message: 'Machine ID already exists' });
      }

      newMachine = {
        _id: `m_${Date.now()}`,
        ...machineData,
        healthScore: machineData.healthScore || 95,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockStore.unshift(newMachine);
    }

    addActivityLog({
      type: 'added',
      assetName: newMachine.assetName,
      machineId: newMachine.machineId,
      user: 'Anita Desai',
    });

    return res.status(201).json({
      success: true,
      data: enrichMachineDetails(newMachine),
      message: 'Machine asset created successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update machine
// @route   PUT /api/machines/:id
exports.updateMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    let updatedMachine = null;
    if (getIsConnected()) {
      updatedMachine = await Machine.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    } else {
      const mockStore = getMockStore();
      const idx = mockStore.findIndex((m) => m._id === id || m.machineId === id);
      if (idx !== -1) {
        mockStore[idx] = { ...mockStore[idx], ...updateData, updatedAt: new Date().toISOString() };
        updatedMachine = mockStore[idx];
      }
    }

    if (!updatedMachine) {
      return res.status(404).json({ success: false, message: 'Machine asset not found' });
    }

    addActivityLog({
      type: 'edited',
      assetName: updatedMachine.assetName,
      machineId: updatedMachine.machineId,
      user: 'Anita Desai',
      details: 'Asset telemetry and specs updated',
    });

    return res.status(200).json({
      success: true,
      data: enrichMachineDetails(updatedMachine),
      message: 'Machine asset updated successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete machine
// @route   DELETE /api/machines/:id
exports.deleteMachine = async (req, res) => {
  try {
    const { id } = req.params;

    let deletedMachine = null;
    if (getIsConnected()) {
      deletedMachine = await Machine.findByIdAndDelete(id);
    } else {
      const mockStore = getMockStore();
      const idx = mockStore.findIndex((m) => m._id === id || m.machineId === id);
      if (idx !== -1) {
        deletedMachine = mockStore.splice(idx, 1)[0];
      }
    }

    if (!deletedMachine) {
      return res.status(404).json({ success: false, message: 'Machine asset not found' });
    }

    addActivityLog({
      type: 'deleted',
      assetName: deletedMachine.assetName,
      machineId: deletedMachine.machineId,
      user: 'Anita Desai',
    });

    return res.status(200).json({
      success: true,
      message: 'Machine asset deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
