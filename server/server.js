const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Dual Database Connection Configurations
const { connectDB } = require('./config/db');
const { initMySQL } = require('./config/mysql');
const { initMongoDB } = require('./config/mongodb');

// Error Handling Middleware
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize MySQL and MongoDB Databases Simultaneously
connectDB();
initMySQL();
initMongoDB();

// ----------------------------------------------------
// Production MVC API Gateway Routes
// ----------------------------------------------------

// 1. Auth APIs
app.use('/api/auth', require('./routes/authRoutes'));

// 2. MySQL Business & Asset Management APIs
app.use('/api', require('./routes/assetRoutes'));
app.use('/api', require('./routes/departmentRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/maintenanceRoutes'));

// 3. MongoDB Telemetry, Sensor & AI Predictions APIs
app.use('/api', require('./routes/sensorRoutes'));
app.use('/api', require('./routes/digitalTwinRoutes'));
app.use('/api', require('./routes/predictionRoutes'));
app.use('/api', require('./routes/simulationRoutes'));

// 4. Aggregated Dashboard & Reports APIs
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api', require('./routes/reportRoutes'));
app.use('/api', require('./routes/maintenanceAlertsRoutes'));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'TexTwin Production MVC Hybrid API Gateway',
    architecture: 'Dual Hybrid Database (MySQL: Asset Management | MongoDB: Telemetry)',
    mysqlDatabase: 'textwin_asset_management',
    mongoDatabase: 'textwin_digital_twin',
    timestamp: new Date().toISOString(),
  });
});

// Centralized Error Handler
app.use(errorHandler);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 TexTwin Production MVC Backend Server running on port ${PORT}`);
});
