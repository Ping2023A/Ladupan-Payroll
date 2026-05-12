import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/client.css";

const MyArchives = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    const res = await api.get("/attendance/my-archives");
    setRecords(res.data);
  };

  return (
    <div>
      <h1>My Archived DTR</h1>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
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

export default MyArchives;