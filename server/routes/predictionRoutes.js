const express = require('express');
const router = express.Router();
const { getPredictions, getPredictionByMachineId, postPrediction } = require('../controllers/predictionController');

router.get('/predictions', getPredictions);
router.post('/predictions', postPrediction);
router.get('/predictions/:machineId', getPredictionByMachineId);

module.exports = router;
