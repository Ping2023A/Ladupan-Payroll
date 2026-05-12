import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import "../../styles/adminDashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    activeDTR: 0,
    totalEmployees: 0,
    generatedPayrolls: 0,
    archivedRecords: 0,
    recentPayrollActivity: {
      lastPayrollPeriod: "Not generated yet",
      processedEmployees: 0,
      lastGeneratedBy: "Not available",
      lastGeneratedDate: "Not available",
    },
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get("/dashboard/admin");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    if (!date || date === "Not available") {
      return "Not available";
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="admin-dashboard">
      <section className="dashboard-hero">
        <div>
          <h1>Welcome, {user?.firstName} 👋</h1>
          <p>Here’s what’s happening in your payroll system.</p>
        </div>

        <div className="dashboard-date">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </section>

      <section>
        <h2 className="section-title">Quick Access</h2>

        <div className="quick-grid">
          <Link to="/admin/employees" className="quick-card">
            <div className="card-icon purple">👥</div>
            <h3>Employee Management</h3>
            <p>Create, update, and manage employee accounts.</p>
            <span>→</span>
          </Link>

          <Link to="/admin/attendance" className="quick-card">
            <div className="card-icon green">📋</div>
            <h3>Attendance Records</h3>
            <p>Monitor employee DTR and attendance activity.</p>
            <span>→</span>
          </Link>

          <Link to="/admin/payroll" className="quick-card">
            <div className="card-icon orange">💰</div>
            <h3>Payroll Generation</h3>
            <p>Generate payroll for selected employees and date range.</p>
            <span>→</span>
          </Link>

          <Link to="/admin/reports" className="quick-card">
            <div className="card-icon blue">📊</div>
            <h3>Payroll Reports</h3>
            <p>View and print generated payroll summaries.</p>
            <span>→</span>
          </Link>

          <Link to="/admin/archives" className="quick-card">
            <div className="card-icon red">🗃️</div>
            <h3>Archives</h3>
            <p>Access archived payroll and attendance records.</p>
            <span>→</span>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="section-title">Overview</h2>

        <div className="overview-grid">
          <div className="overview-card">
            <div className="overview-icon blue">📄</div>
            <div>
              <h3>Active DTR Records</h3>
              <strong>{stats.activeDTR}</strong>
              <p>Records not yet included in payroll</p>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon green">👥</div>
            <div>
              <h3>Total Employees</h3>
              <strong>{stats.totalEmployees}</strong>
              <p>All active employees in the system</p>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon purple">🧾</div>
            <div>
              <h3>Generated Payrolls</h3>
              <strong>{stats.generatedPayrolls}</strong>
              <p>Payroll reports generated</p>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon orange">🗂️</div>
            <div>
              <h3>Archived Records</h3>
              <strong>{stats.archivedRecords}</strong>
              <p>Payroll and attendance records archived</p>
            </div>
          </div>
        </div>
      </section>

      <section className="activity-card">
        <h2>Recent Payroll Activity</h2>

        <div className="activity-grid">
          <div>
            <span>Last Payroll Period</span>
            <h3>{stats.recentPayrollActivity.lastPayrollPeriod}</h3>
            <p>Based on latest generated payroll.</p>
          </div>

          <div>
            <span>Recently Processed Employees</span>
            <h3>
              {stats.recentPayrollActivity.processedEmployees} employees
            </h3>
            <p>Included in latest payroll report.</p>
          </div>

          <div>
            <span>Last Generated By</span>
            <h3>{stats.recentPayrollActivity.lastGeneratedBy}</h3>
            <p>Administrator</p>
          </div>

          <div>
            <span>Last Generated Date</span>
            <h3>
              {formatDate(stats.recentPayrollActivity.lastGeneratedDate)}
            </h3>
            <p>Latest payroll generation date.</p>
          </div>
        </div>

        <Link to="/admin/reports" className="latest-btn">
          View Latest Payroll Report →
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;