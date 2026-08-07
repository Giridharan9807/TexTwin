const express = require('express');
const router = express.Router();
const {
  getUpcomingMaintenance,
  getActiveAlerts,
  acknowledgeAlert,
  getRecentActivity,
} = require('../controllers/dashboardController');

// Maintenance endpoints
router.get('/maintenance/upcoming', getUpcomingMaintenance);

// Alerts endpoints
router.get('/alerts/active', getActiveAlerts);
router.put('/alerts/:id/ack', acknowledgeAlert);

// Activity endpoint
router.get('/activity/recent', getRecentActivity);

module.exports = router;
