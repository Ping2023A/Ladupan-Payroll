import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/payroll.css";

const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");

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
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const getEmployeeName = (emp) => {
    return `${emp.firstName || emp.firstname || emp.name || ""} ${
      emp.lastName || emp.lastname || ""
    }`.trim();
  };

  const handleSelectEmployee = (id) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map((emp) => emp._id));
    }
  };

  const generatePayroll = async (e) => {
    e.preventDefault();

    if (selectedEmployees.length === 0) {
      setMessage("Please select at least one employee.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setReport(null);

      const res = await api.post("/payroll/generate", {
        startDate,
        endDate,
        employeeIds: selectedEmployees,
      });

      setMessage(res.data.message || "Payroll generated successfully.");
      setReport(res.data.payrollReport || res.data.report);
      setSelectedEmployees([]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Payroll generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payroll-page">
      <div className="payroll-header">
        <div>
          <h1>Payroll Generation</h1>
          <p>Generate payroll by date period and selected employees only.</p>
        </div>
      </div>

      <div className="payroll-card">
        <form onSubmit={generatePayroll}>
          <div className="payroll-form-grid">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="employee-select-header">
            <h3>Select Employees</h3>

            <button type="button" className="select-all-btn" onClick={handleSelectAll}>
              {selectedEmployees.length === employees.length
                ? "Unselect All"
                : "Select All"}
            </button>
          </div>

          <div className="employee-list">
            {employees.length > 0 ? (
              employees.map((emp) => (
                <label key={emp._id} className="employee-check-card">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(emp._id)}
                    onChange={() => handleSelectEmployee(emp._id)}
                  />

                  <div>
                    <strong>{getEmployeeName(emp)}</strong>
                    <span>
                      Rate: ₱{Number(emp.hourlyRate || 0).toFixed(2)} | Required In:{" "}
                      {emp.requiredTimeIn || "-"}
                    </span>
                  </div>
                </label>
              ))
            ) : (
              <p className="empty-text">No active employees found.</p>
            )}
          </div>

          <button type="submit" className="generate-btn" disabled={loading}>
            {loading ? "Generating..." : "Generate Payroll"}
          </button>
        </form>

        {message && <p className="payroll-message">{message}</p>}
      </div>

      {report && (
        <div className="payroll-card report-card">
          <h2>Generated Payroll Report</h2>

          <div className="report-summary">
            <p>
              <strong>Payroll Period:</strong>{" "}
              {report.payrollPeriodStart || report.startDate} to{" "}
              {report.payrollPeriodEnd || report.endDate}
            </p>

            <p>
              <strong>Total Employees:</strong>{" "}
              {report.totalEmployees || report.employees?.length || 0}
            </p>
          </div>

          <div className="report-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Present</th>
                  <th>Late</th>
                  <th>Absent</th>
                  <th>Total Hours</th>
                  <th>Gross Salary</th>
                  <th>Late Deduction</th>
                  <th>Cash Advance</th>
                  <th>Other Deductions</th>
                  <th>Net Salary</th>
                </tr>
              </thead>

              <tbody>
                {report.employees?.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.employeeName}</td>
                    <td>{emp.totalPresent || 0}</td>
                    <td>{emp.totalLate || 0}</td>
                    <td>{emp.totalAbsent || 0}</td>
                    <td>{emp.totalHours || 0}</td>
                    <td>₱{Number(emp.grossSalary || 0).toFixed(2)}</td>
                    <td>₱{Number(emp.lateDeductions || 0).toFixed(2)}</td>
                    <td>₱{Number(emp.cashAdvance || 0).toFixed(2)}</td>
                    <td>₱{Number(emp.otherDeductions || 0).toFixed(2)}</td>
                    <td>
                      <strong>₱{Number(emp.netSalary || 0).toFixed(2)}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;