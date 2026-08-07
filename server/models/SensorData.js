const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema(
  {
    machineId: {
      type: String,
      required: true,
      ref: 'Machine',
    },
    temperature: Number,
    vibration: Number,
    rpm: Number,
    yarnTension: Number,
    powerConsumption: Number,
    fabricOutputMeters: Number,
    healthScore: Number,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.SensorData || mongoose.model('SensorData', sensorDataSchema);
