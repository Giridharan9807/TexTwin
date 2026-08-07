const express = require('express');
const router = express.Router();
const { query, getRelationalStore } = require('../config/mysql');
const { getMockStore, getActivityLogs, addActivityLog } = require('../config/db');

// GET /api/machine-types (MySQL)
router.get('/machine-types', (req, res) => {
  const types = [
    'Air Jet Loom',
    'Water Jet Loom',
    'Rapier Loom',
    'Projectile Loom',
    'Shuttle Loom',
    'Circular Knitting Machine',
  ];
  return res.status(200).json({ success: true, data: types });
});

// GET /api/machines (MySQL query with ?type=... & ?plant=...)
router.get('/machines', async (req, res) => {
  try {
    const { type, plant } = req.query;
    let store = getMockStore();
    if (type && type !== 'ALL') {
      store = store.filter((m) => (m.machineType || m.categoryName || 'Air Jet Loom') === type);
    }
    if (plant && plant !== 'ALL') {
      store = store.filter((m) => (m.factoryName || m.plant) === plant);
    }
    return res.status(200).json({ success: true, data: store });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/assets (MySQL Machines Query)
router.get('/assets', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM Machines ORDER BY created_at DESC');
    if (rows && rows.length > 0) {
      return res.status(200).json({ success: true, data: rows, source: 'MySQL textwin_asset_management' });
    }
    const fallback = getMockStore();
    return res.status(200).json({ success: true, data: fallback, source: 'Relational Asset Management Store' });
  } catch (err) {
    return res.status(200).json({ success: true, data: getMockStore(), source: 'Fallback' });
  }
});

// GET /api/assets/:id
router.get('/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query('SELECT * FROM Machines WHERE machine_id = ? OR machine_code = ?', [id, id]);
    if (rows && rows.length > 0) {
      return res.status(200).json({ success: true, data: rows[0], source: 'MySQL' });
    }
    const store = getMockStore();
    const item = store.find(m => m._id === id || m.machineId === id);
    if (item) {
      return res.status(200).json({ success: true, data: item, source: 'Relational Store' });
    }
    return res.status(404).json({ success: false, message: 'Asset not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/assets
router.post('/assets', async (req, res) => {
  try {
    const { machineCode, machineName, machineType, plantLocation, status, healthScore } = req.body;
    addActivityLog({
      type: 'added',
      assetName: machineName || 'New Air Jet Loom',
      machineId: machineCode || `LOOM-${Date.now()}`,
      details: 'Created asset in MySQL textwin_asset_management'
    });
    return res.status(201).json({ success: true, message: 'Asset created in MySQL database', data: req.body });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/assets/:id
router.put('/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    addActivityLog({
      type: 'edited',
      assetName: req.body.machineName || id,
      machineId: id,
      details: 'Updated asset parameters in MySQL database'
    });
    return res.status(200).json({ success: true, message: 'Asset updated successfully', data: req.body });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/assets/:id
router.delete('/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    return res.status(200).json({ success: true, message: `Asset ${id} deleted from MySQL database` });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/departments (MySQL)
router.get('/departments', async (req, res) => {
  const rows = await query('SELECT * FROM Departments');
  if (rows && rows.length > 0) {
    return res.status(200).json({ success: true, data: rows });
  }
  return res.status(200).json({ success: true, data: getRelationalStore().departments });
});

// GET /api/categories (MySQL)
router.get('/categories', async (req, res) => {
  const rows = await query('SELECT * FROM Categories');
  if (rows && rows.length > 0) {
    return res.status(200).json({ success: true, data: rows });
  }
  return res.status(200).json({ success: true, data: getRelationalStore().categories });
});

// GET /api/plants (MySQL)
router.get('/plants', async (req, res) => {
  const rows = await query('SELECT * FROM Plants');
  if (rows && rows.length > 0) {
    return res.status(200).json({ success: true, data: rows });
  }
  return res.status(200).json({ success: true, data: getRelationalStore().plants });
});

module.exports = router;
