const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    machineId: {
      type: String,
      required: true,
    },
    machineName: String,
    severity: {
      type: String,
      enum: ['critical', 'maintenance', 'idle', 'info'],
      default: 'maintenance',
    },
    message: {
      type: String,
      required: true,
    },
    acknowledged: {
      type: Boolean,
      default: false,
    },
    triggeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);
