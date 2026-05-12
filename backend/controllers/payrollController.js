const Attendance = require("../models/Attendance");
const PayrollReport = require("../models/PayrollReport");
const User = require("../models/User");

// GENERATE PAYROLL REPORT
exports.generatePayroll = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const employees = await User.find({
      role: "employee",
    });

    const payrollEmployees = [];

    for (const employee of employees) {
      const records = await Attendance.find({
        employee: employee._id,
        isArchived: false,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      if (records.length === 0) continue;

      let totalPresent = 0;
      let totalLate = 0;
      let totalAbsent = 0;

      let totalHours = 0;
      let grossSalary = 0;
      let lateDeductions = 0;

      records.forEach((record) => {
        totalHours += record.totalHours;
        grossSalary += record.grossPay;
        lateDeductions += record.lateDeduction;

        if (record.remarks === "Present")
          totalPresent++;

        if (record.remarks === "Late")
          totalLate++;

        if (record.remarks === "Absent")
          totalAbsent++;
      });

      const netSalary =
        grossSalary - lateDeductions;

      payrollEmployees.push({
        employee: employee._id,
        employeeName:
          `${employee.firstName} ${employee.lastName}`,

        totalPresent,
        totalLate,
        totalAbsent,

        totalHours,

        grossSalary,

        lateDeductions,

        netSalary,
      });
    }

    const payrollReport =
      await PayrollReport.create({
        payrollPeriodStart: startDate,
        payrollPeriodEnd: endDate,
        generatedBy: req.user._id,
        employees: payrollEmployees,
        totalEmployees: payrollEmployees.length,
      });

    // ARCHIVE RECORDS
    await Attendance.updateMany(
      {
        isArchived: false,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      {
        isArchived: true,
        payrollReport: payrollReport._id,
      }
    );

    res.status(201).json({
      message:
        "Payroll report generated successfully",
      payrollReport,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payroll generation failed",
      error: error.message,
    });
  }
};