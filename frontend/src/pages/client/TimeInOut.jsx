import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/timeinout.css";

const TimeInOut = () => {
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      const res = await api.get("/attendance/my-records");

      const records = Array.isArray(res.data)
        ? res.data
        : res.data.records || [];

      const today = new Date().toISOString().split("T")[0];

      const todayRecord = records.find(
        (record) => record.date === today
      );

      if (todayRecord) {
        setAttendance(todayRecord);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleTimeIn = async () => {
    try {
      setLoading(true);

      const res = await api.post("/attendance/time-in");

      setMessage(res.data.message);
      setAttendance(res.data.attendance);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Time in failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTimeOut = async () => {
    try {
      setLoading(true);

      const res = await api.post("/attendance/time-out");

      setMessage(res.data.message);
      setAttendance(res.data.attendance);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Time out failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (value) => {
    return `₱${Number(value || 0).toFixed(2)}`;
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="client-dashboard-page">
      <div className="client-welcome-card">
        <div>
          <h1>Time In / Time Out</h1>
          <p>Manage your daily attendance records.</p>
        </div>

        <span>{today}</span>
      </div>

      <div className="time-card">
        <div className="time-actions">
          <button
            className="time-in-btn"
            onClick={handleTimeIn}
            disabled={loading}
          >
            {loading ? "Processing..." : "Time In"}
          </button>

          <button
            className="time-out-btn"
            onClick={handleTimeOut}
            disabled={loading}
          >
            {loading ? "Processing..." : "Time Out"}
          </button>
        </div>

        {message && (
          <div className="attendance-message">
            {message}
          </div>
        )}

        <div className="attendance-info-grid">
          <div className="attendance-info-card">
            <span>Date</span>
            <strong>
              {attendance?.date || "No record"}
            </strong>
          </div>

          <div className="attendance-info-card">
            <span>Time In</span>
            <strong>
              {attendance?.timeIn || "Not yet"}
            </strong>
          </div>

          <div className="attendance-info-card">
            <span>Time Out</span>
            <strong>
              {attendance?.timeOut || "Not yet"}
            </strong>
          </div>

          <div className="attendance-info-card">
            <span>Required Time In</span>
            <strong>
              {attendance?.requiredTimeIn || "-"}
            </strong>
          </div>

          <div className="attendance-info-card">
            <span>Total Hours</span>
            <strong>
              {attendance?.totalHours || 0}
            </strong>
          </div>

          <div className="attendance-info-card">
            <span>Gross Pay</span>
            <strong>
              {formatMoney(attendance?.grossPay)}
            </strong>
          </div>

          <div className="attendance-info-card">
            <span>Late Deduction</span>
            <strong>
              {formatMoney(attendance?.lateDeduction)}
            </strong>
          </div>

          <div className="attendance-info-card">
            <span>Remarks</span>

            <strong
              className={`status ${(attendance?.remarks || "Incomplete").toLowerCase()}`}
            >
              {attendance?.remarks || "Incomplete"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeInOut;