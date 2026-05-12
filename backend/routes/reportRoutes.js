const express = require("express");
const router = express.Router();

const {
  getPayrollReports,
  getPayrollReportById,
  getArchivedAttendance,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

router.get("/payroll", protect, adminOnly, getPayrollReports);
router.get("/payroll/:id", protect, adminOnly, getPayrollReportById);
router.get("/archives", protect, adminOnly, getArchivedAttendance);

module.exports = router;