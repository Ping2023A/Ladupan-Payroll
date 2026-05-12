const Attendance = require("../models/Attendance");
const { calculateAttendance } = require("../utils/attendanceRules");

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const getCurrentTime = () => {
  return new Date().toTimeString().slice(0, 5);
};

// EMPLOYEE TIME IN
exports.timeIn = async (req, res) => {
  try {
    const employee = req.user;
    const today = getToday();
    const currentTime = getCurrentTime();

    const existingAttendance = await Attendance.findOne({
      employee: employee._id,
      date: today,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "You have already timed in today",
      });
    }

    const attendance = await Attendance.create({
      employee: employee._id,
      date: today,
      requiredTimeIn: employee.requiredTimeIn,
      timeIn: currentTime,
      hourlyRate: employee.hourlyRate,
    });

    res.status(201).json({
      message: "Time in successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Time in failed",
      error: error.message,
    });
  }
};

// EMPLOYEE TIME OUT
exports.timeOut = async (req, res) => {
  try {
    const employee = req.user;
    const today = getToday();
    const currentTime = getCurrentTime();

    const attendance = await Attendance.findOne({
      employee: employee._id,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({
        message: "You must time in first before timing out",
      });
    }

    if (attendance.timeOut) {
      return res.status(400).json({
        message: "You have already timed out today",
      });
    }

    const result = calculateAttendance({
      requiredTimeIn: attendance.requiredTimeIn,
      timeIn: attendance.timeIn,
      timeOut: currentTime,
      hourlyRate: attendance.hourlyRate,
    });

    attendance.timeOut = currentTime;
    attendance.totalHours = result.totalHours;
    attendance.grossPay = result.grossPay;
    attendance.lateMinutes = result.lateMinutes;
    attendance.lateDeduction = result.lateDeduction;
    attendance.remarks = result.remarks;

    await attendance.save();

    res.json({
      message: "Time out successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Time out failed",
      error: error.message,
    });
  }
};

// GET MY ACTIVE ATTENDANCE RECORDS
exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      employee: req.user._id,
      isArchived: false,
    }).sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get attendance records",
      error: error.message,
    });
  }
};

// GET MY ARCHIVED ATTENDANCE RECORDS
exports.getMyArchivedAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      employee: req.user._id,
      isArchived: true,
    }).sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get archived attendance",
      error: error.message,
    });
  }
};

// ADMIN GET ALL ACTIVE ATTENDANCE
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      isArchived: false,
    })
      .populate(
        "employee",
        "employeeId firstName lastName"
      )
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};