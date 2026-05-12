const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    requiredTimeIn: {
      type: String,
      required: true,
    },

    timeIn: {
      type: String,
      default: null,
    },

    timeOut: {
      type: String,
      default: null,
    },

    totalHours: {
      type: Number,
      default: 0,
    },

    hourlyRate: {
      type: Number,
      required: true,
    },

    grossPay: {
      type: Number,
      default: 0,
    },

    lateMinutes: {
      type: Number,
      default: 0,
    },

    lateDeduction: {
      type: Number,
      default: 0,
    },

    remarks: {
      type: String,
      enum: ["Present", "Late", "Absent"],
      default: "Present",
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    payrollReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayrollReport",
      default: null,
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);