const express = require("express");
const router = express.Router();

const {
  timeIn,
  timeOut,
  getMyAttendance,
  getMyArchivedAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");

const { protect } = require("../middleware/authMiddleware");

const {
  employeeOnly,
  adminOnly,
} = require("../middleware/roleMiddleware");

// EMPLOYEE ROUTES
router.post(
  "/time-in",
  protect,
  employeeOnly,
  timeIn
);

router.post(
  "/time-out",
  protect,
  employeeOnly,
  timeOut
);

router.get(
  "/my-records",
  protect,
  employeeOnly,
  getMyAttendance
);

router.get(
  "/my-archives",
  protect,
  employeeOnly,
  getMyArchivedAttendance
);

// ADMIN ROUTES
router.get(
  "/all",
  protect,
  adminOnly,
  getAllAttendance
);

module.exports = router;