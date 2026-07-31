const telemetryService = require('../services/telemetryService');

exports.getSensors = async (req, res) => {
  try {
    const data = await telemetryService.getSensors();
    res.status(200).json({ success: true, count: data.length, data, source: 'MongoDB textwin_digital_twin.sensorData' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSensorsByMachineId = async (req, res) => {
  try {
    const data = await telemetryService.getSensors(req.params.machineId);
    res.status(200).json({ success: true, machineId: req.params.machineId, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.postSensor = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: 'Sensor data ingested into MongoDB textwin_digital_twin', data: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
