const express = require('express');
const router = express.Router();
const { getMaintenance, createMaintenance } = require('../controllers/maintenanceController');

router.get('/maintenance', getMaintenance);
router.post('/maintenance', createMaintenance);

module.exports = router;
