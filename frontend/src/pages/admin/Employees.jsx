import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [form, setForm] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    hourlyRate: "",
    requiredTimeIn: "08:00",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createEmployee = async (e) => {
    e.preventDefault();

    await api.post("/employees/create", form);

    setForm({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      hourlyRate: "",
      requiredTimeIn: "08:00",
    });

    setShowCreateModal(false);
    fetchEmployees();
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedEmployee(null);
    setDeleteModal(false);
  };

  const confirmDelete = async () => {
    // This currently removes only from frontend view.
    // Backend delete route can be added next.
    setEmployees(
      employees.filter((emp) => emp._id !== selectedEmployee._id)
    );

    closeDeleteModal();
  };

  const filteredEmployees = employees.filter((emp) => {
    const keyword = search.toLowerCase();
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();

    const matchesSearch =
      emp.employeeId?.toLowerCase().includes(keyword) ||
      fullName.includes(keyword) ||
      emp.email?.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && emp.isActive) ||
      (statusFilter === "inactive" && !emp.isActive);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="employees-page">
      <div className="employees-header">
        <div>
          <h1>Employee Management</h1>
          <p>Manage employee accounts and their information.</p>
        </div>

        <button
          className="create-open-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Employee
        </button>
      </div>

      <div className="employee-toolbar">
        <input
          type="text"
          placeholder="Search employee by ID, name, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          className="reset-btn"
          onClick={() => {
            setSearch("");
            setStatusFilter("all");
          }}
        >
          Reset
        </button>

        <button className="search-btn">Search</button>
      </div>

      <div className="employee-table-card">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Hourly Rate</th>
              <th>Required Time In</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.employeeId}</td>
                <td>
                  {emp.firstName} {emp.lastName}
                </td>
                <td>{emp.email}</td>
                <td>₱{Number(emp.hourlyRate).toFixed(2)}</td>
                <td>{emp.requiredTimeIn}</td>
                <td>
                  <span
                    className={
                      emp.isActive ? "status active" : "status inactive"
                    }
                  >
                    ● {emp.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">Edit</button>

                    <button
                      className="delete-btn"
                      onClick={() => openDeleteModal(emp)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-row">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="table-footer">
          <p>
            Showing 1 to {filteredEmployees.length} of {employees.length}{" "}
            employees
          </p>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="create-modal">
            <div className="modal-header">
              <div>
                <h2>Create Employee</h2>
                <p>Add a new employee account.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>

            <form className="employee-form" onSubmit={createEmployee}>
              <input
                name="employeeId"
                placeholder="Employee ID"
                value={form.employeeId}
                onChange={handleChange}
                required
              />

              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />

              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <input
                name="hourlyRate"
                type="number"
                placeholder="Hourly Rate"
                value={form.hourlyRate}
                onChange={handleChange}
                required
              />

              <input
                name="requiredTimeIn"
                type="time"
                value={form.requiredTimeIn}
                onChange={handleChange}
                required
              />

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && selectedEmployee && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="warning-icon">⚠</div>

            <h2>Delete Employee</h2>

            <p>
              Are you sure you want to delete this employee?
              <br />
              <span>This action cannot be undone.</span>
            </p>

            <div className="delete-info">
              <p>
                <strong>Employee ID:</strong>{" "}
                {selectedEmployee.employeeId}
              </p>
              <p>
                <strong>Name:</strong>{" "}
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </p>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeDeleteModal}>
                Cancel
              </button>

              <button className="confirm-delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;