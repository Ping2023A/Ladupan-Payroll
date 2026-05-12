const mongoose = require("mongoose");

const payrollReportSchema = new mongoose.Schema(
  {
    payrollPeriodStart: {
      type: String,
      required: true,
    },

    payrollPeriodEnd: {
      type: String,
      required: true,
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employees: [
      {
        employee: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        employeeName: String,

        totalPresent: Number,
        totalLate: Number,
        totalAbsent: Number,

        totalHours: Number,

        grossSalary: Number,

        lateDeductions: Number,

        cashAdvance: {
          type: Number,
          default: 0,
        },

        otherDeductions: {
          type: Number,
          default: 0,
        },

        netSalary: Number,
      },
    ],

    totalEmployees: {
      type: Number,
      default: 0,
    },

    generatedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PayrollReport",
  payrollReportSchema
);