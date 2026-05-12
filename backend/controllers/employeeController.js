const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET ALL EMPLOYEES
exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({
      role: "employee",
    }).select("-password");

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};

// CREATE EMPLOYEE
exports.createEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      password,
      hourlyRate,
      requiredTimeIn,
    } = req.body;

    const existingEmployee = await User.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await User.create({
      employeeId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "employee",
      hourlyRate,
      requiredTimeIn,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

// UPDATE EMPLOYEE
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    employee.firstName =
      req.body.firstName || employee.firstName;

    employee.lastName =
      req.body.lastName || employee.lastName;

    employee.email =
      req.body.email || employee.email;

    employee.hourlyRate =
      req.body.hourlyRate || employee.hourlyRate;

    employee.requiredTimeIn =
      req.body.requiredTimeIn || employee.requiredTimeIn;

    employee.isActive =
      req.body.isActive ?? employee.isActive;

    await employee.save();

    res.json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update employee",
      error: error.message,
    });
  }
};

// DELETE EMPLOYEE
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete employee",
      error: error.message,
    });
  }
};