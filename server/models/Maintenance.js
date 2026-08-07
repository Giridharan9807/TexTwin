const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
  {
    machineId: {
      type: String,
      required: true,
    },
    assetName: String,
    type: {
      type: String,
      default: 'Preventative Inspection',
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    engineer: String,
    status: {
      type: String,
      enum: ['Scheduled', 'In-Progress', 'Completed'],
      default: 'Scheduled',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Maintenance', maintenanceSchema);
