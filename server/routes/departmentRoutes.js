const express = require('express');
const router = express.Router();
const { getDepartments, createDepartment } = require('../controllers/assetController');

router.get('/departments', getDepartments);
router.post('/departments', createDepartment);

module.exports = router;
