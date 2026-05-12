import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/ladupan-logo.png";
import "../styles/layout.css";

const ClientLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <img
          src={logo}
          alt="Ladupan Logo"
          className="sidebar-logo"
        />

        <h2>Ladupan</h2>
        <p>Employee Portal</p>

        <nav>
          <Link to="/client/dashboard">
            Dashboard
          </Link>

          <Link to="/client/time">
            Time In / Out
          </Link>

          <Link to="/client/records">
            My Records
          </Link>

          <Link to="/client/archives">
            My Archives
          </Link>

          <Link to="/client/account">
            My Account
          </Link>
        </nav>

        <button onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h3>
            Welcome, {user?.firstName}
          </h3>
        </header>

        {children}
      </main>
    </div>
  );
};

export default ClientLayout;