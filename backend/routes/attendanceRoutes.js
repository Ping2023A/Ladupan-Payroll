const express = require("express");
const router = express.Router();

const {
  timeIn,
  timeOut,
  getMyAttendance,
  getMyArchivedAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/time-in", protect, timeIn);
router.put("/time-out", protect, timeOut);

router.get("/my-records", protect, getMyAttendance);
router.get("/my-archives", protect, getMyArchivedAttendance);

router.get("/", protect, adminOnly, getAllAttendance);

module.exports = router;