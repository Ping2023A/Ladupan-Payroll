const express = require("express");
const router = express.Router();

const {
  generatePayroll,
} = require("../controllers/payrollController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

router.post(
  "/generate",
  protect,
  adminOnly,
  generatePayroll
);

module.exports = router;