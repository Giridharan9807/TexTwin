const { query, getRelationalStore } = require('../config/mysql');
const { getMockStore } = require('../config/db');

class AssetService {
  async getAllAssets() {
    const rows = await query('SELECT * FROM Machines ORDER BY created_at DESC');
    if (rows && rows.length > 0) return rows;
    return getMockStore();
  }

  async getAssetById(id) {
    const rows = await query('SELECT * FROM Machines WHERE machine_id = ? OR machine_code = ?', [id, id]);
    if (rows && rows.length > 0) return rows[0];
    const store = getMockStore();
    return store.find(m => m._id === id || m.machineId === id) || store[0];
  }

  async createAsset(data) {
    const { machineCode, machineName, machineType, plantLocation, status, healthScore } = data;
    await query(
      'INSERT INTO Machines (machine_code, machine_name, machine_type, location, status, health_score) VALUES (?, ?, ?, ?, ?, ?)',
      [machineCode || `LOOM-${Date.now()}`, machineName, machineType || 'Air Jet Loom', plantLocation || 'Main Hub', status || 'Running', healthScore || 95]
    );
    return data;
  }

  async getDepartments() {
    const rows = await query('SELECT * FROM Departments');
    if (rows && rows.length > 0) return rows;
    return getRelationalStore().departments;
  }

  async getCategories() {
    const rows = await query('SELECT * FROM Categories');
    if (rows && rows.length > 0) return rows;
    return getRelationalStore().categories;
  }

  async getPlants() {
    const rows = await query('SELECT * FROM Plants');
    if (rows && rows.length > 0) return rows;
    return getRelationalStore().plants;
  }
}

module.exports = new AssetService();
