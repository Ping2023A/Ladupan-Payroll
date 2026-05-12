import { useAuth } from "../../context/AuthContext";
import "../../styles/client.css";

const ClientDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "10px" }}>
      <h1>
        Welcome, {user?.firstName} {user?.lastName}
      </h1>

      <p>
        Ladupan Payroll Employee Portal
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Attendance</h3>
          <p>
            Manage your daily Time In and Time Out.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>My Records</h3>
          <p>
            View your active DTR records and payroll data.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Archives</h3>
          <p>
            Access your previous payroll and archived records.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>My Account</h3>
          <p>
            Review your account information and settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;