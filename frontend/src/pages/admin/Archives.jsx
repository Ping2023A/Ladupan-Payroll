import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/admin.css";

const Archives = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    const res = await api.get("/reports/archives");
    setRecords(res.data);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Archived Attendance Records</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Total Hours</th>
            <th>Gross Pay</th>
            <th>Late Deduction</th>
            <th>Remarks</th>
            <th>Payroll Period</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>
                {record.employee?.firstName}{" "}
                {record.employee?.lastName}
              </td>

              <td>{record.date}</td>

              <td>{record.timeIn || "-"}</td>

              <td>{record.timeOut || "-"}</td>

              <td>{record.totalHours}</td>

              <td>₱{record.grossPay}</td>

              <td>₱{record.lateDeduction}</td>

              <td>{record.remarks}</td>

              <td>
                {record.payrollReport?.payrollPeriodStart}
                {" "}to{" "}
                {record.payrollReport?.payrollPeriodEnd}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Archives;