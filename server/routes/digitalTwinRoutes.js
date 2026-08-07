const express = require('express');
const router = express.Router();
const { getDigitalTwin, getDigitalTwinByMachineId, getEventsByMachineId } = require('../controllers/digitalTwinController');

router.get('/digitalTwin', getDigitalTwin);
router.get('/digitalTwin/:machineId', getDigitalTwinByMachineId);
router.get('/events/:machineId', getEventsByMachineId);

module.exports = router;
