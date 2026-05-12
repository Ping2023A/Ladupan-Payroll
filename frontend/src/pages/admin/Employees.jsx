import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/admin.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    hourlyRate: "",
    requiredTimeIn: "08:00",
  });

  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createEmployee = async (e) => {
    e.preventDefault();

    await api.post("/employees/create", form);

    setForm({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      hourlyRate: "",
      requiredTimeIn: "08:00",
    });

    fetchEmployees();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Employee Management</h1>

      <form onSubmit={createEmployee} style={{ marginBottom: "30px" }}>
        <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="hourlyRate" placeholder="Hourly Rate" value={form.hourlyRate} onChange={handleChange} required />
        <input name="requiredTimeIn" type="time" value={form.requiredTimeIn} onChange={handleChange} required />

        <button type="submit">Create Employee</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Hourly Rate</th>
            <th>Required Time In</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.employeeId}</td>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.email}</td>
              <td>₱{emp.hourlyRate}</td>
              <td>{emp.requiredTimeIn}</td>
              <td>{emp.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;