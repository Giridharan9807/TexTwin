const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema(
  {
    machineId: {
      type: String,
      required: [true, 'Machine ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    assetName: {
      type: String,
      required: [true, 'Asset Name is required'],
      trim: true,
    },
    machineType: {
      type: String,
      required: [true, 'Machine Type is required'],
      default: 'Air Jet Loom',
    },
    manufacturer: {
      type: String,
      default: 'Toyota Industries',
    },
    modelNumber: {
      type: String,
      default: 'JAT810',
    },
    serialNumber: {
      type: String,
      default: 'SN-2024-8891',
    },
    installationDate: {
      type: Date,
      default: Date.now,
    },
    factoryName: {
      type: String,
      default: 'TexTwin Weaving Mill #1',
    },
    plantLocation: {
      type: String,
      default: 'Main Production Unit',
    },
    department: {
      type: String,
      default: 'Weaving & Looming',
    },
    productionLine: {
      type: String,
      default: 'Line Alpha',
    },
    physicalLocation: {
      type: String,
      default: 'Floor 1 - Section B',
    },
    purchaseCost: {
      type: Number,
      default: 45000,
    },
    warrantyExpiry: {
      type: Date,
    },
    currentStatus: {
      type: String,
      enum: ['Running', 'Idle', 'Maintenance'],
      default: 'Running',
    },
    assignedOperator: {
      type: String,
      default: 'Rajesh Kumar',
    },
    maintenanceEngineer: {
      type: String,
      default: 'Anita Desai',
    },
    lastMaintenanceDate: {
      type: Date,
    },
    nextScheduledMaintenance: {
      type: Date,
    },
    assetCriticality: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
    healthScore: {
      type: Number,
      default: 95,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for formatted status badge color helper
machineSchema.methods.getStatusBadgeColor = function () {
  switch (this.currentStatus) {
    case 'Running':
      return 'success';
    case 'Idle':
      return 'warning';
    case 'Maintenance':
      return 'danger';
    default:
      return 'secondary';
  }
};

module.exports = mongoose.models.Machine || mongoose.model('Machine', machineSchema);
