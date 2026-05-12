import { useState } from "react";
import api from "../../api/axios";
import "../../styles/client.css";

const TimeInOut = () => {
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState(null);

  const handleTimeIn = async () => {
    try {
      const res = await api.post("/attendance/time-in");
      setMessage(res.data.message);
      setAttendance(res.data.attendance);
    } catch (err) {
      setMessage(err.response?.data?.message || "Time in failed");
    }
  };

  const handleTimeOut = async () => {
    try {
      const res = await api.post("/attendance/time-out");
      setMessage(res.data.message);
      setAttendance(res.data.attendance);
    } catch (err) {
      setMessage(err.response?.data?.message || "Time out failed");
    }
  };

  return (
    <div>
      <h1>Time In / Time Out</h1>

      <button onClick={handleTimeIn}>Time In</button>
      <button onClick={handleTimeOut}>Time Out</button>

      {message && <p>{message}</p>}

      {attendance && (
        <div>
          <p>Date: {attendance.date}</p>
          <p>Time In: {attendance.timeIn || "Not yet"}</p>
          <p>Time Out: {attendance.timeOut || "Not yet"}</p>
          <p>Remarks: {attendance.remarks}</p>
        </div>
      )}
    </div>
  );
};

export default TimeInOut;