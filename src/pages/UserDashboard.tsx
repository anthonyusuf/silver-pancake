import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/UserDashboard.css"; // unified styles
import backgroundImg from "../components/background2.jpg";

interface Donation {
  id: number;
  user_email: string;
  charity: string;
  amount: number;
  method: string;
  created_at: string;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({
    amount: "",
    method: "Credit Card",
  });
  const [donations, setDonations] = useState<Donation[]>([]);
  const userEmail = localStorage.getItem("userEmail");
  const firstname = localStorage.getItem("firstname") || "User";
  const lastname = localStorage.getItem("lastname") || "";

  useEffect(() => {
    if (!userEmail) return;
    axios
      .get(`http://localhost:8081/donations?user_email=${userEmail}`)
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Error fetching donations:", err));
  }, [userEmail]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userEmail) {
      alert("User not logged in.");
      return;
    }

    axios
      .post("http://localhost:8081/donate", {
        user_email: userEmail,
        charity: "Save the Trees", // preset charity
        ...values,
      })
      .then((res) => {
        if (res.data.Status === "Donation Successful") {
          alert("Thank you for your donation!");
          axios
            .get(`http://localhost:8081/donations?user_email=${userEmail}`)
            .then((res) => setDonations(res.data));
        } else {
          alert(res.data.Error || "Donation failed");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    axios.get("http://localhost:8081/auth/logout")
      .then(result => {
        if (result.data.Status === "Success") {
          localStorage.removeItem("valid");
          navigate("/");
        } else {
          alert(result.data.Error || "Logout failed");
        }
      })
      .catch(err => {
        console.error("Logout error:", err);
        alert("Server error");
      });
  };

  return (
    <div className="dashboard-container">
      {/* Background */}
      <img src={backgroundImg} alt="Background" className="dashboard-bg" />

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <Link to="/" className="brand">
            WriteOffTrack
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/user-dashboard" className="nav-item">Dashboard</Link>
            </li>
            <li>
              <Link to="/manage-receipts" className="nav-item">Manage Receipts</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-item logout-btn">
                Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <header className="dashboard-header">
            <h4>User Dashboard</h4>
          </header>
          <div className="welcome-text">Welcome {firstname} {lastname}</div>

          <div className="widgets">
            {/* Donation Form Widget */}
            <div className="card donation-form">
              <h4>Make a Donation to Save The Trees</h4>
              <form onSubmit={handleSubmit}>
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={values.amount}
                  onChange={(e) => setValues({ ...values, amount: e.target.value })}
                />

                <label>Method</label>
                <select
                  value={values.method}
                  onChange={(e) => setValues({ ...values, method: e.target.value })}
                >
                  <option>Credit Card</option>
                  <option>PayPal</option>
                  <option>Bank Transfer</option>
                </select>

                <button type="submit" className="btn-primary">
                  Donate
                </button>
              </form>
            </div>

            {/* Donation History Widget */}
            <div className="card donation-history">
              <h4>Donation History</h4>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User Email</th>
                    <th>Charity</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.length > 0 ? (
                    donations.map((donation) => (
                      <tr key={donation.id}>
                        <td>{donation.id}</td>
                        <td>{donation.user_email}</td>
                        <td>{donation.charity}</td>
                        <td>${donation.amount}</td>
                        <td>{donation.method}</td>
                        <td>{new Date(donation.created_at).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="no-data">
                        No donations yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;