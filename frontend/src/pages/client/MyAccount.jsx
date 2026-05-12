import { useAuth } from "../../context/AuthContext";
import "../../styles/client.css";

const MyAccount = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Account</h1>

      <div style={{ marginTop: "20px", lineHeight: "2" }}>
        <p><strong>Employee ID:</strong> {user?.employeeId}</p>
        <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Hourly Rate:</strong> ₱{user?.hourlyRate}</p>
        <p><strong>Required Time In:</strong> {user?.requiredTimeIn}</p>
      </div>
    </div>
  );
};

export default MyAccount;