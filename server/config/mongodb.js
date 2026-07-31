const mongoose = require('mongoose');

let isConnectedToMongoDB = false;

// 1. SensorData Schema
const sensorDataSchema = new mongoose.Schema({
  machineId: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
  temperature: Number,
  rpm: Number,
  vibration: Number,
  humidity: Number,
  pressure: Number,
  power: Number,
  current: Number,
  airFlow: Number,
  yarnTension: Number,
  energyConsumption: Number,
  machineHealth: Number,
});

// 2. Predictions Schema
const predictionSchema = new mongoose.Schema({
  machineId: { type: String, required: true, index: true },
  predictionTime: { type: Date, default: Date.now },
  failureProbability: Number,
  remainingUsefulLife: Number,
  healthScore: Number,
  recommendation: String,
});

// 3. DigitalTwin Schema
const digitalTwinSchema = new mongoose.Schema({
  machineId: { type: String, required: true, unique: true },
  currentStatus: String,
  syncTime: { type: Date, default: Date.now },
  virtualHealth: Number,
  performanceScore: Number,
  efficiency: Number,
});

// 4. LiveTelemetry Schema
const liveTelemetrySchema = new mongoose.Schema({
  machineId: { type: String, required: true, unique: true },
  sensorValues: mongoose.Schema.Types.Mixed,
  updatedAt: { type: Date, default: Date.now },
});

// 5. SystemLogs Schema
const systemLogSchema = new mongoose.Schema({
  machineId: String,
  eventType: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.models.SensorData || mongoose.model('SensorData', sensorDataSchema);
const Prediction = mongoose.models.Prediction || mongoose.model('Prediction', predictionSchema);
const DigitalTwinModel = mongoose.models.DigitalTwin || mongoose.model('DigitalTwin', digitalTwinSchema);
const LiveTelemetry = mongoose.models.LiveTelemetry || mongoose.model('LiveTelemetry', liveTelemetrySchema);
const SystemLog = mongoose.models.SystemLog || mongoose.model('SystemLog', systemLogSchema);

const initMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/textwin_digital_twin';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnectedToMongoDB = true;
    console.log(`✅ MongoDB Connected: textwin_digital_twin (${conn.connection.host})`);
  } catch (error) {
    isConnectedToMongoDB = false;
    console.log(`⚠️  MongoDB service not detected locally (Using active In-Memory Digital Twin Store). Error: ${error.message}`);
  }
};

const getIsMongoDBConnected = () => isConnectedToMongoDB;

module.exports = {
  initMongoDB,
  getIsMongoDBConnected,
  SensorData,
  Prediction,
  DigitalTwinModel,
  LiveTelemetry,
  SystemLog,
};
