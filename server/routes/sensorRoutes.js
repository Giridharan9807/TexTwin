const express = require('express');
const router = express.Router();
const { getSensors, getSensorsByMachineId, postSensor } = require('../controllers/sensorController');

router.get('/sensors', getSensors);
router.post('/sensors', postSensor);
router.get('/sensors/:machineId', getSensorsByMachineId);

module.exports = router;
