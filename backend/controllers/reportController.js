const PayrollReport = require("../models/PayrollReport");
const Attendance = require("../models/Attendance");

// GET ALL PAYROLL REPORTS
exports.getPayrollReports = async (req, res) => {
  try {
    const reports = await PayrollReport.find()
      .populate("generatedBy", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payroll reports",
      error: error.message,
    });
  }
};

// GET SINGLE PAYROLL REPORT
exports.getPayrollReportById = async (req, res) => {
  try {
    const report = await PayrollReport.findById(req.params.id)
      .populate("generatedBy", "firstName lastName email")
      .populate("employees.employee", "employeeId firstName lastName email");

    if (!report) {
      return res.status(404).json({
        message: "Payroll report not found",
      });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payroll report",
      error: error.message,
    });
  }
};

// GET ARCHIVED ATTENDANCE RECORDS
exports.getArchivedAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      isArchived: true,
    })
      .populate("employee", "employeeId firstName lastName email")
      .populate("payrollReport", "payrollPeriodStart payrollPeriodEnd")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch archived attendance",
      error: error.message,
    });
  }
};