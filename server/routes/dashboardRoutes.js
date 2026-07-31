const express = require('express');
const router = express.Router();
const {
  getSummary,
  getFleetStatus,
  getHealthTrend,
  getProduction,
  getEnergy,
  getUpcomingMaintenance,
  getActiveAlerts,
  getKpiDetails,
  acknowledgeAlert,
  getRecentActivity,
  getLiveStream,
} = require('../controllers/dashboardController');

router.get('/summary', getSummary);
router.get('/fleet-status', getFleetStatus);
router.get('/health-trend', getHealthTrend);
router.get('/production', getProduction);
router.get('/energy', getEnergy);
router.get('/live', getLiveStream);
router.get('/kpi-details/:kpiKey', getKpiDetails);

module.exports = router;
