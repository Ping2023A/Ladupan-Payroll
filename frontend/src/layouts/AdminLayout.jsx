import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/ladupan-logo.png";
import "../styles/layout.css";

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <img src={logo} alt="Ladupan Logo" className="sidebar-logo" />

        <h2>Ladupan</h2>
        <p>Admin Panel</p>

        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/employees">Employees</Link>
          <Link to="/admin/attendance">Attendance</Link>
          <Link to="/admin/payroll">Payroll</Link>
          <Link to="/admin/reports">Reports</Link>
          <Link to="/admin/archives">Archives</Link>
        </nav>

        <button onClick={handleLogout}>Logout</button>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;