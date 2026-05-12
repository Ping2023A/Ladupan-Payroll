const express = require("express");
const router = express.Router();

const {
  getEmployees,
  createEmployee,
  updateEmployee,
} = require("../controllers/employeeController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

router.get("/", protect, adminOnly, getEmployees);

router.post(
  "/create",
  protect,
  adminOnly,
  createEmployee
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateEmployee
);

module.exports = router;