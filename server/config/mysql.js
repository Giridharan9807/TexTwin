const mysql = require('mysql2/promise');

let pool = null;
let isConnectedToMySQL = false;

// Fallback Relational Store for zero-config offline execution
let relationalStore = {
  plants: [
    { plant_id: 1, plant_name: 'TexTwin Primary Mill', location: 'Coimbatore Hub' },
    { plant_id: 2, plant_name: 'TexTwin Technical Fabrics', location: 'Tirupur Facility' },
    { plant_id: 3, plant_name: 'TexTwin Denim Weaving', location: 'Gujarat Hub' },
    { plant_id: 4, plant_name: 'TexTwin Silk & Jacquard Unit', location: 'Kanchipuram Hub' },
    { plant_id: 5, plant_name: 'TexTwin Eco-Cotton Mill', location: 'Salem Hub' },
    { plant_id: 6, plant_name: 'TexTwin Synthetic Complex', location: 'Surat Hub' }
  ],
  departments: [
    { department_id: 1, department_name: 'High-Speed Weaving', manager: 'Anita Desai', description: 'Air Jet & Rapier High-Speed Production' },
    { department_id: 2, department_name: 'Jacquard Weaving', manager: 'Manoj Kumar', description: 'Intricate Pattern Brocades & Fancy Fabrics' },
    { department_id: 3, department_name: 'Heavy Technical Fabrics', manager: 'Suresh Mehta', description: 'Industrial Canvas & Reinforcement Fabrics' },
    { department_id: 4, department_name: 'Synthetic Filament Division', manager: 'Sanjay Shah', description: 'High Tenacity Polyester & Nylon Weaving' }
  ],
  categories: [
    { category_id: 1, category_name: 'Air Jet Looms', description: 'Pneumatic Weft Insertion Looms (900-1200 RPM)' },
    { category_id: 2, category_name: 'Rapier Looms', description: 'Mechanical Flexible/Rigid Rapier Looms' },
    { category_id: 3, category_name: 'Water Jet Looms', description: 'Hydrophobic Filament Weaving Looms' }
  ]
};

const initMySQL = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || '127.0.0.1',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'textwin_asset_management',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 2000,
    });

    const conn = await pool.getConnection();
    conn.release();
    isConnectedToMySQL = true;
    console.log('✅ MySQL Database Connected: textwin_asset_management');
  } catch (error) {
    isConnectedToMySQL = false;
    console.log(`⚠️  MySQL service not detected locally (Using Relational Store Fallback). Error: ${error.message}`);
  }
};

const query = async (sql, params = []) => {
  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (err) {
      console.warn('MySQL Execution fallback:', err.message);
    }
  }
  return null;
};

const getIsMySQLConnected = () => isConnectedToMySQL;
const getRelationalStore = () => relationalStore;

module.exports = {
  initMySQL,
  query,
  getIsMySQLConnected,
  getRelationalStore,
};
