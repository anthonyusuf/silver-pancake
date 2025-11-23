import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/UserDashboard.css"; // reuse dashboard styles
import backgroundImg from "../components/background2.jpg";

interface Donation {
  id: number;
  user_email: string;
  charity: string;
  amount: number;
  method: string;
  created_at: string;
}

const ManageReceipts = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [donations, setDonations] = useState<Donation[]>([]);
  const userEmail = localStorage.getItem("userEmail");
  const firstname = localStorage.getItem("firstname") || "User";
  const lastname = localStorage.getItem("lastname") || "";

  useEffect(() => {
    if (!userEmail) return;
    axios
      .get(`http://localhost:8081/donations?user_email=${userEmail}`)
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Error fetching receipts:", err));
  }, [userEmail]);

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
          <Link to="/" className="brand">WriteOffTrack</Link>
          <ul className="nav-links">
            <li><Link to="/user-dashboard" className="nav-item">Dashboard</Link></li>
            <li><Link to="/manage-receipts" className="nav-item">Manage Receipts</Link></li>
            <li><button onClick={handleLogout} className="nav-item logout-btn">Logout</button></li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <header className="dashboard-header">
            <h4>Manage Receipts</h4>
          </header>
          <div className="welcome-text">Welcome {firstname} {lastname}</div>

          <div className="widgets">
            {/* Receipts Widget */}
            <div className="card receipts">
              <h4>Your Receipts</h4>
              {donations.length > 0 ? (
                <ul className="receipt-list">
                  {donations.map((donation) => (
                    <li key={donation.id} className="receipt-item">
                      <p><strong>Receipt #{donation.id}</strong></p>
                      <p>User: {donation.user_email}</p>
                      <p>Charity: Save the Trees</p>
                      <p>Amount: ${donation.amount}</p>
                      <p>Method: {donation.method}</p>
                      <p>Date: {new Date(donation.created_at).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-data">No receipts available.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageReceipts;