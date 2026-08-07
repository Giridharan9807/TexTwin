const { SensorData, Prediction, DigitalTwinModel, LiveTelemetry, getIsMongoDBConnected } = require('../config/mongodb');

class TelemetryService {
  async getSensors(machineId) {
    if (getIsMongoDBConnected()) {
      const filter = machineId ? { machineId } : {};
      const data = await SensorData.find(filter).limit(100).sort({ timestamp: -1 });
      if (data && data.length > 0) return data;
    }
    return [
      { machineId: machineId || 'LOOM-101', type: 'Temperature', val: '52.4 °C', status: 'Normal', timestamp: new Date() },
      { machineId: machineId || 'LOOM-101', type: 'Vibration', val: '0.18 mm/s', status: 'Normal', timestamp: new Date() },
      { machineId: machineId || 'LOOM-101', type: 'RPM', val: '1,080 RPM', status: 'Normal', timestamp: new Date() },
      { machineId: machineId || 'LOOM-201', type: 'Temperature', val: '76.8 °C', status: 'Warning', timestamp: new Date() },
      { machineId: machineId || 'LOOM-201', type: 'Vibration', val: '0.42 mm/s', status: 'Critical', timestamp: new Date() },
    ];
  }

  async getPredictions(machineId) {
    if (getIsMongoDBConnected()) {
      const filter = machineId ? { machineId } : {};
      const preds = await Prediction.find(filter).sort({ predictionTime: -1 });
      if (preds && preds.length > 0) return preds;
    }
    return [
      { machineId: 'LOOM-201', failureProbability: 0.78, remainingUsefulLife: 34, healthScore: 68, recommendation: 'Schedule drive shaft bearing overhaul' },
      { machineId: 'LOOM-501', failureProbability: 0.64, remainingUsefulLife: 58, healthScore: 72, recommendation: 'Apply lubricant & inspect cooling fan' },
      { machineId: 'LOOM-101', failureProbability: 0.04, remainingUsefulLife: 1450, healthScore: 96, recommendation: 'Nominal operation. No maintenance required' },
    ];
  }

  async getDigitalTwins(machineId) {
    if (getIsMongoDBConnected()) {
      const filter = machineId ? { machineId } : {};
      const twins = await DigitalTwinModel.find(filter);
      if (twins && twins.length > 0) return twins;
    }
    return [
      { machineId: 'LOOM-101', currentStatus: 'RUNNING', virtualHealth: 98, efficiency: 97.4, syncTime: new Date() },
      { machineId: 'LOOM-201', currentStatus: 'MAINTENANCE', virtualHealth: 68, efficiency: 72.0, syncTime: new Date() },
      { machineId: 'LOOM-301', currentStatus: 'RUNNING', virtualHealth: 96, efficiency: 98.1, syncTime: new Date() },
    ];
  }
}

module.exports = new TelemetryService();
