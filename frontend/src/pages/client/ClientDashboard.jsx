import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/client.css";

const ClientDashboard = () => {
  const { user } = useAuth();

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
          <h1>
            Welcome, {user?.firstName || "Employee"} 👋
          </h1>
          <p>Ladupan Payroll Employee Portal</p>
        </div>

        <span>{today}</span>
      </div>

      <h2 className="client-section-title">Quick Access</h2>

      <div className="client-quick-grid">
        <Link to="/client/attendance" className="client-quick-card">
          <div className="client-icon purple">⏰</div>
          <h3>Attendance</h3>
          <p>Time In and Time Out for your daily attendance.</p>
          <span>→</span>
        </Link>

        <Link to="/client/records" className="client-quick-card">
          <div className="client-icon green">📋</div>
          <h3>My Records</h3>
          <p>View your active DTR records not yet archived.</p>
          <span>→</span>
        </Link>

        <Link to="/client/archives" className="client-quick-card">
          <div className="client-icon orange">🗂️</div>
          <h3>My Archives</h3>
          <p>Access your archived DTR records from payroll.</p>
          <span>→</span>
        </Link>

        <Link to="/client/account" className="client-quick-card">
          <div className="client-icon blue">👤</div>
          <h3>My Account</h3>
          <p>View your employee account information.</p>
          <span>→</span>
        </Link>
      </div>

      <h2 className="client-section-title">Overview</h2>

      <div className="client-overview-grid">
        <div className="client-overview-card">
          <div className="client-icon purple">📄</div>
          <div>
            <h4>Active Records</h4>
            <strong>View</strong>
            <p>DTR records not yet included in payroll.</p>
          </div>
        </div>

        <div className="client-overview-card">
          <div className="client-icon green">⏰</div>
          <div>
            <h4>Attendance</h4>
            <strong>Time In / Out</strong>
            <p>Manage today’s attendance entry.</p>
          </div>
        </div>

        <div className="client-overview-card">
          <div className="client-icon orange">🗂️</div>
          <div>
            <h4>Archives</h4>
            <strong>History</strong>
            <p>View archived payroll attendance records.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;