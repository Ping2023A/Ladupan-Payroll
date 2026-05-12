import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/admin.css";

const Attendance = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance/all");
      setRecords(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Attendance Records</h1>

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
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Total Hours</th>
            <th>Gross Pay</th>
            <th>Late Deduction</th>
            <th>Remarks</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;