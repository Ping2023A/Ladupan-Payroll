const User = require("../models/User");
const Attendance = require("../models/Attendance");
const PayrollReport = require("../models/PayrollReport");

exports.getAdminDashboard = async (req, res) => {
  try {
    const activeDTR = await Attendance.countDocuments({
      isArchived: false,
    });

    const totalEmployees = await User.countDocuments({
      role: "employee",
      isActive: true,
    });

    const generatedPayrolls = await PayrollReport.countDocuments();

    const archivedRecords = await Attendance.countDocuments({
      isArchived: true,
    });

    const latestPayroll = await PayrollReport.findOne()
      .populate("generatedBy", "firstName lastName role")
      .sort({ createdAt: -1 });

    let recentPayrollActivity = {
      lastPayrollPeriod: "Not generated yet",
      processedEmployees: 0,
      lastGeneratedBy: "Not available",
      lastGeneratedDate: "Not available",
    };

    if (latestPayroll) {
      recentPayrollActivity = {
        lastPayrollPeriod: `${latestPayroll.payrollPeriodStart} to ${latestPayroll.payrollPeriodEnd}`,
        processedEmployees: latestPayroll.totalEmployees,
        lastGeneratedBy: `${latestPayroll.generatedBy?.firstName || ""} ${latestPayroll.generatedBy?.lastName || ""}`,
        lastGeneratedDate: latestPayroll.generatedDate,
      };
    }

    res.json({
      activeDTR,
      totalEmployees,
      generatedPayrolls,
      archivedRecords,
      recentPayrollActivity,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};