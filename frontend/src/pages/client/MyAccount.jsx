import { useAuth } from "../../context/AuthContext";
import "../../styles/myaccount.css";

const MyAccount = () => {
  const { user } = useAuth();

  const formatMoney = (value) => {
    return `₱${Number(value || 0).toFixed(2)}`;
  };

  return (
    <div className="myaccount-page">
      <div className="myaccount-header">
        <div>
          <h1>My Account</h1>
          <p>View your employee account and payroll settings.</p>
        </div>
      </div>

      <div className="myaccount-card">
        <div className="profile-section">
          <div className="profile-avatar">
            {(user?.firstName?.[0] || "E").toUpperCase()}
          </div>

          <div>
            <h2>
              {user?.firstName || "Employee"} {user?.lastName || ""}
            </h2>
            <p>{user?.email || "No email available"}</p>
          </div>
        </div>

        <div className="account-grid">
          <div className="account-info-box">
            <span>Employee ID</span>
            <strong>{user?.employeeId || "-"}</strong>
          </div>

          <div className="account-info-box">
            <span>Full Name</span>
            <strong>
              {user?.firstName || "-"} {user?.lastName || ""}
            </strong>
          </div>

          <div className="account-info-box">
            <span>Email Address</span>
            <strong>{user?.email || "-"}</strong>
          </div>

          <div className="account-info-box">
            <span>Role</span>
            <strong>{user?.role || "-"}</strong>
          </div>

          <div className="account-info-box">
            <span>Hourly Rate</span>
            <strong>{formatMoney(user?.hourlyRate)}</strong>
          </div>

          <div className="account-info-box">
            <span>Required Time In</span>
            <strong>{user?.requiredTimeIn || "-"}</strong>
          </div>

          <div className="account-info-box">
            <span>Account Status</span>
            <strong>{user?.status || "Active"}</strong>
          </div>
        </div>
      </div>

      <div className="myaccount-card">
        <h2 className="settings-title">Settings</h2>

        <div className="settings-list">
          <div className="setting-row">
            <div>
              <h3>Password</h3>
              <p>For account security, contact admin if you need to change your password.</p>
            </div>

            <button disabled>Admin Only</button>
          </div>

          <div className="setting-row">
            <div>
              <h3>Payroll Settings</h3>
              <p>Your hourly rate and required time-in are managed by the admin.</p>
            </div>

            <button disabled>Locked</button>
          </div>

          <div className="setting-row">
            <div>
              <h3>Account Information</h3>
              <p>Your employee profile is connected to Ladupan payroll records.</p>
            </div>

            <button disabled>View Only</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;