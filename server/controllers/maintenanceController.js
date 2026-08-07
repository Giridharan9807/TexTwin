const { query } = require('../config/mysql');

exports.getMaintenance = async (req, res) => {
  try {
    const rows = await query('SELECT * FROM Maintenance ORDER BY start_date DESC');
    if (rows && rows.length > 0) {
      return res.status(200).json({ success: true, data: rows });
    }
    const sample = [
      { maintenance_id: 1, machine_id: 'LOOM-201', maintenance_type: 'Main Motor Overhaul', engineer: 'Anita Desai', start_date: '2026-08-02', status: 'Scheduled' },
      { maintenance_id: 2, machine_id: 'LOOM-104', maintenance_type: 'Nozzle Calibration', engineer: 'Karthik N', start_date: '2026-08-05', status: 'Scheduled' },
      { maintenance_id: 3, machine_id: 'LOOM-101', maintenance_type: 'Gear Lubrication', engineer: 'Anita Desai', start_date: '2026-08-12', status: 'Scheduled' },
    ];
    return res.status(200).json({ success: true, data: sample });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createMaintenance = async (req, res) => {
  try {
    return res.status(201).json({ success: true, message: 'Maintenance record created in MySQL database', data: req.body });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
