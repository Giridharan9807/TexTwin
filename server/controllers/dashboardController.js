const Machine = require('../models/Machine');
const SensorData = require('../models/SensorData');
const Alert = require('../models/Alert');
const Maintenance = require('../models/Maintenance');
const { getIsConnected, getMockStore, getActivityLogs } = require('../config/db');

// Helper to generate last 7 days dates
const getLast7Days = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

let mockAlerts = [
  {
    _id: 'alt-1',
    id: 'alt-1',
    severity: 'critical',
    message: 'High shaft vibration detected (0.42 mm/s > 0.30 mm/s threshold)',
    machineId: 'LOOM-201',
    machineName: 'Dornier Air Jet HD-2025',
    acknowledged: false,
    triggeredAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    _id: 'alt-2',
    id: 'alt-2',
    severity: 'critical',
    message: 'Main drive motor temperature exceeding 82°C (Overheat)',
    machineId: 'LOOM-104',
    machineName: 'Tsudakoma Water Jet ZAX',
    acknowledged: false,
    triggeredAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    _id: 'alt-3',
    id: 'alt-3',
    severity: 'warning',
    message: 'Weft optical sensor lens dust accumulation',
    machineId: 'LOOM-301',
    machineName: 'Picanol OptiMax Rapier',
    acknowledged: false,
    triggeredAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];

let mockUpcomingMaintenance = [
  {
    _id: 'maint-1',
    machineId: 'LOOM-201',
    assetName: 'Dornier Air Jet HD-2025',
    workOrder: 'WO-8043',
    type: 'Drive Shaft Bearing Replacement & Lube Flush',
    scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    engineer: 'Rajesh Kumar (Senior Shift Engineer)',
    status: 'In Progress',
  },
  {
    _id: 'maint-2',
    machineId: 'LOOM-104',
    assetName: 'Tsudakoma Water Jet ZAX',
    workOrder: 'WO-8044',
    type: 'Nozzle High-Pressure Pump Flush',
    scheduledDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    engineer: 'Karthik N (Hydraulic Specialist)',
    status: 'Scheduled',
  },
];

const computeSummaryFromAssets = (allMachines) => {
  const totalAssets = allMachines.length;
  const running = allMachines.filter((m) => (m.currentStatus || '').toUpperCase() === 'RUNNING').length;
  const idle = allMachines.filter((m) => (m.currentStatus || '').toUpperCase() === 'IDLE').length;
  const maintenance = allMachines.filter((m) => (m.currentStatus || '').toUpperCase() === 'MAINTENANCE').length;
  const highCriticality = allMachines.filter((m) => (m.assetCriticality || '').toUpperCase() === 'HIGH').length;

  return { totalAssets, running, idle, maintenance, highCriticality };
};

// 1. Dashboard Summary
exports.getSummary = async (req, res) => {
  try {
    let allMachines = [];
    if (getIsConnected()) {
      allMachines = await Machine.find();
    } else {
      allMachines = getMockStore();
    }

    const summary = computeSummaryFromAssets(allMachines);
    return res.status(200).json({ success: true, data: summary });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Fleet Status
exports.getFleetStatus = async (req, res) => {
  try {
    let allMachines = [];
    if (getIsConnected()) {
      allMachines = await Machine.find();
    } else {
      allMachines = getMockStore();
    }

    const running = allMachines.filter((m) => (m.currentStatus || '').toUpperCase() === 'RUNNING').length;
    const idle = allMachines.filter((m) => (m.currentStatus || '').toUpperCase() === 'IDLE').length;
    const maintenance = allMachines.filter((m) => (m.currentStatus || '').toUpperCase() === 'MAINTENANCE').length;

    return res.status(200).json({
      success: true,
      data: { running, idle, maintenance },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 3. Health Trend
exports.getHealthTrend = async (req, res) => {
  try {
    const days = getLast7Days();
    const mockHealthScores = [96, 95, 94, 91, 93, 95, 94];

    const trendData = days.map((date, idx) => ({
      date,
      avgHealthScore: mockHealthScores[idx] || 94,
    }));

    return res.status(200).json({ success: true, data: trendData });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 4. Production Output
exports.getProduction = async (req, res) => {
  try {
    const days = getLast7Days();
    const result = [];

    days.forEach((date) => {
      result.push({ date, line: 'Line 1 - High Speed Weaving', output: Math.floor(Math.random() * 200 + 1200) });
      result.push({ date, line: 'Line 2 - Heavy Air Jet Complex', output: Math.floor(Math.random() * 150 + 980) });
    });

    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 5. Energy Consumption
exports.getEnergy = async (req, res) => {
  try {
    const todayKwh = 1245.0;
    const hourlyTrend = [45, 52, 60, 64, 58, 62, 70, 75, 82, 88, 85, 79, 81, 84, 86, 90, 88, 76, 65, 50, 48, 44, 42, 40];

    return res.status(200).json({
      success: true,
      data: { todayKwh, hourlyTrend },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 6. Upcoming Maintenance
exports.getUpcomingMaintenance = async (req, res) => {
  try {
    if (getIsConnected()) {
      const items = await Maintenance.find({ status: 'Scheduled' }).sort({ scheduledDate: 1 });
      return res.status(200).json({ success: true, data: items });
    } else {
      return res.status(200).json({ success: true, data: mockUpcomingMaintenance });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 7. Active Alerts
exports.getActiveAlerts = async (req, res) => {
  try {
    if (getIsConnected()) {
      const active = await Alert.find({ acknowledged: false }).sort({ triggeredAt: -1 });
      return res.status(200).json({ success: true, data: active });
    } else {
      const active = mockAlerts.filter((a) => !a.acknowledged);
      return res.status(200).json({ success: true, data: active });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 8. Deep KPI Inspection Details Endpoint
exports.getKpiDetails = async (req, res) => {
  try {
    const { kpiKey } = req.params;
    let payload = {};

    switch ((kpiKey || '').toLowerCase()) {
      case 'running':
        payload = {
          title: 'Running Weaving Fleet (16 / 20 Active)',
          summary: '16 Weaving Looms active in Coimbatore Hub operating at 90% production efficiency.',
          machines: [
            { id: 'LOOM-101', name: 'Toyota Air Jet Alpha', rpm: 1050, temp: '54°C', operator: 'Arun Kumar', status: 'Running' },
            { id: 'LOOM-103', name: 'Dornier Air Jet HD-2025', rpm: 1080, temp: '58°C', operator: 'Suresh Mehta', status: 'Running' },
            { id: 'LOOM-301', name: 'Picanol OptiMax Rapier', rpm: 1020, temp: '52°C', operator: 'Priya Sharma', status: 'Running' },
            { id: 'LOOM-501', name: 'Sulzer Projectile P7300', rpm: 980, temp: '48°C', operator: 'Ramesh V', status: 'Running' },
            { id: 'LOOM-601', name: 'Mayer Circular Knitting', rpm: 1120, temp: '61°C', operator: 'Vijay K', status: 'Running' },
          ],
        };
        break;

      case 'idle':
        payload = {
          title: 'Idle Weaving Looms (2 Standby)',
          summary: '2 Looms currently paused for routine warp beam reload & fabric style changeover.',
          machines: [
            { id: 'LOOM-102', name: 'Toyota Air Jet Beta', reason: 'Warp Beam Reel Reload', idleDuration: '18 mins', operator: 'Karthik N' },
            { id: 'LOOM-105', name: 'Tsudakoma Water Jet', reason: 'Denim Fabric Style Changeover', idleDuration: '32 mins', operator: 'Anita Desai' },
          ],
        };
        break;

      case 'maintenance':
        payload = {
          title: 'Scheduled Work Orders (2 Under Service)',
          summary: '2 Looms under active preventive maintenance & drive shaft lube overhaul.',
          workOrders: mockUpcomingMaintenance,
        };
        break;

      case 'alerts':
        payload = {
          title: 'Active Incident Alerts (3 Immediate Action Required)',
          summary: '3 Telemetry threshold alerts require operator or engineer attention.',
          alerts: mockAlerts,
        };
        break;

      case 'production':
        payload = {
          title: "Today's Production Yield (14,250 Meters / 16,000 m Target)",
          summary: '89% of target achieved across Morning Shift & Afternoon Shift.',
          shifts: [
            { shift: 'Morning Shift', meters: 8400, target: 8000, status: 'Target Exceeded (+5%)' },
            { shift: 'Afternoon Shift (In Progress)', meters: 5850, target: 8000, status: 'On Track (73%)' },
          ],
          efficiency: '96.4% OEE',
        };
        break;

      case 'oee':
        payload = {
          title: 'Overall Equipment Effectiveness (OEE: 96.4%)',
          summary: 'World-class manufacturing OEE rating across Coimbatore Primary Weaving Facility.',
          metrics: {
            availability: '98.2% (16/20 Running)',
            performance: '97.8% (1050 RPM Speed Ratio)',
            quality: '99.1% (Zero Defect Fabric Output)',
          },
        };
        break;

      case 'energy':
        payload = {
          title: 'Energy Load & Sustainability (1,245 kWh Today)',
          summary: 'Optimal energy utilization with active power factor correction.',
          powerFactor: '0.95 (Optimal)',
          peakDemandKw: '142.5 kW',
          co2SavedKg: '124 kg CO₂e',
          dailyCostEstINR: '₹9,960',
        };
        break;

      default:
        payload = { title: 'KPI Details', summary: 'Operational KPI detail information.' };
    }

    return res.status(200).json({ success: true, kpiKey, data: payload });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 9. Acknowledge Alert
exports.acknowledgeAlert = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const alert = await Alert.findByIdAndUpdate(id, { acknowledged: true }, { new: true });
      return res.status(200).json({ success: true, data: alert, message: 'Alert acknowledged' });
    } else {
      const alert = mockAlerts.find((a) => a._id === id || a.id === id);
      if (alert) alert.acknowledged = true;
      return res.status(200).json({ success: true, data: alert, message: 'Alert acknowledged' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 10. Recent Activity
exports.getRecentActivity = async (req, res) => {
  try {
    const activities = getActivityLogs().slice(0, 5);
    return res.status(200).json({ success: true, data: activities });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// 11. SSE Live Stream
exports.getLiveStream = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = async () => {
    let allMachines = [];
    if (getIsConnected()) {
      try {
        allMachines = await Machine.find();
      } catch (e) {}
    } else {
      allMachines = getMockStore();
    }

    const summary = computeSummaryFromAssets(allMachines);

    const eventData = {
      timestamp: new Date().toISOString(),
      summary,
      fleet: {
        running: summary.running,
        idle: summary.idle,
        maintenance: summary.maintenance,
      },
      activities: getActivityLogs().slice(0, 5),
    };

    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  };

  sendEvent();
  const intervalId = setInterval(sendEvent, 2000);
  req.on('close', () => {
    clearInterval(intervalId);
  });
};
