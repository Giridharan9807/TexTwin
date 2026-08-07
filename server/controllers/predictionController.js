const telemetryService = require('../services/telemetryService');

exports.getPredictions = async (req, res) => {
  try {
    const data = await telemetryService.getPredictions();
    res.status(200).json({ success: true, count: data.length, data, source: 'MongoDB textwin_digital_twin.predictions' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPredictionByMachineId = async (req, res) => {
  try {
    const data = await telemetryService.getPredictions(req.params.machineId);
    res.status(200).json({ success: true, machineId: req.params.machineId, data: data[0] || data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.postPrediction = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: 'AI prediction created in MongoDB', data: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
