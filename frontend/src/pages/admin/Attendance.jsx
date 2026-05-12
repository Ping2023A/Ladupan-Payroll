import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/attendance.css";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    timeIn: "",
    timeOut: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees", authHeader);

      const employeeList = Array.isArray(res.data)
        ? res.data
        : res.data.employees || res.data.data || [];

      const activeEmployees = employeeList.filter(
        (emp) =>
          emp.role === "employee" &&
          (emp.status === "Active" ||
            emp.status === "active" ||
            emp.isActive === true ||
            emp.employmentStatus === "Active" ||
            !emp.status)
      );

      setEmployees(activeEmployees);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance", authHeader);

      const attendanceList = Array.isArray(res.data)
        ? res.data
        : res.data.attendance || res.data.records || res.data.data || [];

      setRecords(attendanceList);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  const getEmployeeName = (employee) => {
    if (!employee) return "Unknown Employee";

    if (typeof employee === "string") {
      const foundEmployee = employees.find((emp) => emp._id === employee);
      if (!foundEmployee) return "Unknown Employee";

      return `${foundEmployee.firstName || foundEmployee.firstname || foundEmployee.name || ""} ${
        foundEmployee.lastName || foundEmployee.lastname || ""
      }`.trim();
    }

    return `${employee.firstName || employee.firstname || employee.name || ""} ${
      employee.lastName || employee.lastname || ""
    }`.trim();
  };

  const getEmployeeId = (record) => {
    return record.employee?._id || record.employee || "";
  };

  const getRecordDate = (date) => {
    if (!date) return "";
    return date.includes("T") ? date.slice(0, 10) : date;
  };

  const formatMoney = (value) => {
    return `₱${Number(value || 0).toFixed(2)}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditingRecord(null);
    setFormData({
      employee: "",
      date: "",
      timeIn: "",
      timeOut: "",
    });
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);

    setFormData({
      employee: getEmployeeId(record),
      date: getRecordDate(record.date),
      timeIn: record.timeIn || "",
      timeOut: record.timeOut || "",
    });

    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedEmployee = employees.find((emp) => emp._id === formData.employee);

    const payload = {
      employee: formData.employee,
      date: formData.date,
      timeIn: formData.timeIn,
      timeOut: formData.timeOut,
      requiredTimeIn: selectedEmployee?.requiredTimeIn || "08:00",
      hourlyRate: selectedEmployee?.hourlyRate || 0,
    };

    try {
      if (editingRecord) {
        await axios.put(
          `http://localhost:5000/api/attendance/${editingRecord._id}`,
          payload,
          authHeader
        );
      } else {
        await axios.post("http://localhost:5000/api/attendance", payload, authHeader);
      }

      setShowModal(false);
      setEditingRecord(null);
      fetchAttendance();
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert(err.response?.data?.message || "Failed to save attendance record.");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/attendance/${deleteRecord._id}`,
        authHeader
      );

      setDeleteRecord(null);
      fetchAttendance();
    } catch (err) {
      console.error("Error deleting attendance:", err);
      alert(err.response?.data?.message || "Failed to delete attendance record.");
    }
  };

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <div>
          <h1>Attendance Management</h1>
          <p>Manage employee daily time records and attendance status.</p>
        </div>

        <button className="add-btn" onClick={openAddModal}>
          + Add Attendance
        </button>
      </div>

      <div className="attendance-card">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Required In</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Total Hours</th>
              <th>Hourly Rate</th>
              <th>Gross Pay</th>
              <th>Late Deduction</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record._id}>
                  <td>{getEmployeeName(record.employee)}</td>
                  <td>{getRecordDate(record.date)}</td>
                  <td>{record.requiredTimeIn || "-"}</td>
                  <td>{record.timeIn || "-"}</td>
                  <td>{record.timeOut || "-"}</td>
                  <td>{record.totalHours || 0}</td>
                  <td>{formatMoney(record.hourlyRate)}</td>
                  <td>{formatMoney(record.grossPay)}</td>
                  <td>{formatMoney(record.lateDeduction)}</td>
                  <td>
                    <span className={`status ${(record.remarks || "Incomplete").toLowerCase()}`}>
                      {record.remarks || "Incomplete"}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => openEditModal(record)}>
                      Edit
                    </button>

                    <button className="delete-btn" onClick={() => setDeleteRecord(record)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="empty-text">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{editingRecord ? "Edit Attendance" : "Add Attendance"}</h2>

            <form onSubmit={handleSubmit}>
              <label>Employee</label>
              <select
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                required
              >
                <option value="">Select employee</option>

                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {getEmployeeName(emp)}
                  </option>
                ))}
              </select>

              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <label>Time In</label>
              <input
                type="time"
                name="timeIn"
                value={formData.timeIn}
                onChange={handleChange}
                required
              />

              <label>Time Out</label>
              <input
                type="time"
                name="timeOut"
                value={formData.timeOut}
                onChange={handleChange}
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowModal(false);
                    setEditingRecord(null);
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingRecord ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteRecord && (
        <div className="modal-overlay">
          <div className="delete-box">
            <h2>Delete Attendance?</h2>

            <p>
              Are you sure you want to delete this attendance record? This action
              cannot be undone.
            </p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteRecord(null)}>
                Cancel
              </button>

              <button className="delete-confirm-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;