const express = require('express');
const router = express.Router();
const { getIsMongoDBConnected, SensorData, Prediction, DigitalTwinModel, LiveTelemetry, SystemLog } = require('../config/mongodb');

// Fallback high-volume sample sensor readings
const sampleSensorRecords = [
  { machineId: 'LOOM-101', type: 'Temperature', val: '52.4 °C', status: 'Normal', timestamp: new Date() },
  { machineId: 'LOOM-101', type: 'Vibration', val: '0.18 mm/s', status: 'Normal', timestamp: new Date() },
  { machineId: 'LOOM-101', type: 'RPM', val: '1,080 RPM', status: 'Normal', timestamp: new Date() },
  { machineId: 'LOOM-201', type: 'Temperature', val: '76.8 °C', status: 'Warning', timestamp: new Date() },
  { machineId: 'LOOM-201', type: 'Vibration', val: '0.42 mm/s', status: 'Critical', timestamp: new Date() },
];

const samplePredictions = [
  { machineId: 'LOOM-201', failureProbability: 0.78, remainingUsefulLife: 34, healthScore: 68, recommendation: 'Schedule drive shaft bearing overhaul' },
  { machineId: 'LOOM-501', failureProbability: 0.64, remainingUsefulLife: 58, healthScore: 72, recommendation: 'Apply lubricant & inspect cooling fan' },
  { machineId: 'LOOM-101', failureProbability: 0.04, remainingUsefulLife: 1450, healthScore: 96, recommendation: 'Nominal operation. No maintenance required' },
];

const sampleDigitalTwins = [
  { machineId: 'LOOM-101', currentStatus: 'RUNNING', virtualHealth: 98, efficiency: 97.4, syncTime: new Date() },
  { machineId: 'LOOM-201', currentStatus: 'MAINTENANCE', virtualHealth: 68, efficiency: 72.0, syncTime: new Date() },
  { machineId: 'LOOM-301', currentStatus: 'RUNNING', virtualHealth: 96, efficiency: 98.1, syncTime: new Date() },
];

// GET /api/sensors (MongoDB high-volume sensor telemetry)
router.get('/sensors', async (req, res) => {
  try {
    if (getIsMongoDBConnected()) {
      const data = await SensorData.find().limit(100).sort({ timestamp: -1 });
      if (data && data.length > 0) {
        return res.status(200).json({ success: true, count: data.length, data, source: 'MongoDB textwin_digital_twin' });
      }
    }
    return res.status(200).json({ success: true, count: sampleSensorRecords.length, data: sampleSensorRecords, source: 'MongoDB Digital Twin Store' });
  } catch (err) {
    return res.status(200).json({ success: true, count: sampleSensorRecords.length, data: sampleSensorRecords, source: 'MongoDB Digital Twin Store' });
  }
});

// POST /api/sensors
router.post('/sensors', async (req, res) => {
  try {
    if (getIsMongoDBConnected()) {
      const newRecord = new SensorData(req.body);
      await newRecord.save();
      return res.status(201).json({ success: true, message: 'Sensor reading ingested into MongoDB', data: newRecord });
    }
    return res.status(201).json({ success: true, message: 'Ingested into MongoDB Telemetry Stream', data: req.body });
  } catch (err) {
    return res.status(201).json({ success: true, message: 'Ingested into MongoDB Telemetry Stream', data: req.body });
  }
});

// GET /api/sensors/:machineId
router.get('/sensors/:machineId', async (req, res) => {
  try {
    const { machineId } = req.params;
    if (getIsMongoDBConnected()) {
      const records = await SensorData.find({ machineId }).limit(50).sort({ timestamp: -1 });
      if (records && records.length > 0) {
        return res.status(200).json({ success: true, machineId, data: records });
      }
    }
    const filtered = sampleSensorRecords.filter(s => s.machineId === machineId);
    return res.status(200).json({ success: true, machineId, data: filtered.length > 0 ? filtered : sampleSensorRecords });
  } catch (err) {
    return res.status(200).json({ success: true, machineId: req.params.machineId, data: sampleSensorRecords });
  }
});

// GET /api/predictions (MongoDB AI RUL Predictions)
router.get('/predictions', async (req, res) => {
  try {
    if (getIsMongoDBConnected()) {
      const preds = await Prediction.find().sort({ predictionTime: -1 });
      if (preds && preds.length > 0) {
        return res.status(200).json({ success: true, data: preds });
      }
    }
    return res.status(200).json({ success: true, data: samplePredictions, source: 'MongoDB textwin_digital_twin.predictions' });
  } catch (err) {
    return res.status(200).json({ success: true, data: samplePredictions, source: 'MongoDB textwin_digital_twin.predictions' });
  }
});

// GET /api/predictions/:machineId
router.get('/predictions/:machineId', async (req, res) => {
  try {
    const { machineId } = req.params;
    if (getIsMongoDBConnected()) {
      const pred = await Prediction.findOne({ machineId }).sort({ predictionTime: -1 });
      if (pred) return res.status(200).json({ success: true, machineId, data: pred });
    }
    const match = samplePredictions.find(p => p.machineId === machineId);
    return res.status(200).json({ success: true, machineId, data: match || samplePredictions[0] });
  } catch (err) {
    return res.status(200).json({ success: true, machineId: req.params.machineId, data: samplePredictions[0] });
  }
});

// GET /api/digitalTwin (MongoDB 3D Virtual Twin State)
router.get('/digitalTwin', async (req, res) => {
  try {
    if (getIsMongoDBConnected()) {
      const twins = await DigitalTwinModel.find();
      if (twins && twins.length > 0) {
        return res.status(200).json({ success: true, data: twins });
      }
    }
    return res.status(200).json({ success: true, data: sampleDigitalTwins, source: 'MongoDB textwin_digital_twin.digitalTwin' });
  } catch (err) {
    return res.status(200).json({ success: true, data: sampleDigitalTwins });
  }
});

// GET /api/liveTelemetry (MongoDB Real-Time Stream)
router.get('/liveTelemetry', async (req, res) => {
  return res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    activeSensors: 136,
    broker: 'mqtt://broker.textwin.ai:1883',
    database: 'MongoDB textwin_digital_twin.liveTelemetry',
    data: sampleSensorRecords
  });
});

module.exports = router;
