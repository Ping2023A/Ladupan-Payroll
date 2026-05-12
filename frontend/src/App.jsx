import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";

// ADMIN PAGES
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import Attendance from "./pages/admin/Attendance";
import Payroll from "./pages/admin/Payroll";
import Reports from "./pages/admin/Reports";
import Archives from "./pages/admin/Archives";

// CLIENT PAGES
import ClientDashboard from "./pages/client/ClientDashboard";
import TimeInOut from "./pages/client/TimeInOut";
import MyRecords from "./pages/client/MyRecords";
import MyArchives from "./pages/client/MyArchives";
import MyAccount from "./pages/client/MyAccount";

// ROUTES & LAYOUTS
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <Employees />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <Attendance />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payroll"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <Payroll />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <Reports />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/archives"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout>
                <Archives />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* CLIENT ROUTES */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute allowedRole="employee">
              <ClientLayout>
                <ClientDashboard />
              </ClientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/time"
          element={
            <ProtectedRoute allowedRole="employee">
              <ClientLayout>
                <TimeInOut />
              </ClientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/records"
          element={
            <ProtectedRoute allowedRole="employee">
              <ClientLayout>
                <MyRecords />
              </ClientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/archives"
          element={
            <ProtectedRoute allowedRole="employee">
              <ClientLayout>
                <MyArchives />
              </ClientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/account"
          element={
            <ProtectedRoute allowedRole="employee">
              <ClientLayout>
                <MyAccount />
              </ClientLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;