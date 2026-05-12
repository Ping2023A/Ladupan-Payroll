import { useState } from "react";
import api from "../../api/axios";
import "../../styles/admin.css";

const Payroll = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [report, setReport] = useState(null);

  const generatePayroll = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/payroll/generate", {
        startDate,
        endDate,
      });

      setMessage(res.data.message);
      setReport(res.data.payrollReport);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Payroll generation failed"
      );
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Payroll Generation</h1>

      <form
        onSubmit={generatePayroll}
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div>
          <label>Start Date</label>
          <br />
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <br />
          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          Generate Payroll
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "20px" }}>
          {message}
        </p>
      )}

      {report && (
        <div style={{ marginTop: "30px" }}>
          <h2>Generated Payroll Report</h2>

          <p>
            Payroll Period:
            {" "}
            {report.payrollPeriodStart}
            {" "}to{" "}
            {report.payrollPeriodEnd}
          </p>

          <p>
            Total Employees:
            {" "}
            {report.totalEmployees}
          </p>

          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th>Employee</th>
                <th>Present</th>
                <th>Late</th>
                <th>Absent</th>
                <th>Total Hours</th>
                <th>Gross Salary</th>
                <th>Late Deduction</th>
                <th>Net Salary</th>
              </tr>
            </thead>

            <tbody>
              {report.employees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.employeeName}</td>
                  <td>{emp.totalPresent}</td>
                  <td>{emp.totalLate}</td>
                  <td>{emp.totalAbsent}</td>
                  <td>{emp.totalHours}</td>
                  <td>₱{emp.grossSalary}</td>
                  <td>₱{emp.lateDeductions}</td>
                  <td>₱{emp.netSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payroll;