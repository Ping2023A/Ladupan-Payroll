exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

exports.employeeOnly = (req, res, next) => {
  if (req.user && req.user.role === "employee") {
    next();
  } else {
    res.status(403).json({ message: "Employee access only" });
  }
};