import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Donation {
  id: number;
  user_email: string;   
  charity: string;
  amount: number;
  method: string;
  created_at: string;
}

function ManageDonations() {
  const [values, setValues] = useState({
    charity: "",
    amount: "",
    method: "Credit Card"
  });
  const [donations, setDonations] = useState<Donation[]>([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) return; // safety check
    axios.get(`http://localhost:8081/donations?user_email=${userEmail}`)   // ✅ use user_email
      .then(res => setDonations(res.data))
      .catch(err => console.error("Error fetching donations:", err));
  }, [userEmail]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userEmail) {
      alert("User not logged in.");
      return;
    }

    axios.post('http://localhost:8081/donate', { user_email: userEmail, ...values })  // ✅ use user_email
      .then(res => {
        if (res.data.Status === "Donation Successful") {
          alert("Thank you for your donation!");
          // Refresh donations list
          axios.get(`http://localhost:8081/donations?user_email=${userEmail}`)   // ✅ use user_email
            .then(res => setDonations(res.data));
        } else {
          alert(res.data.Error || "Donation failed");
        }
      })
      .catch(err => console.error(err));
  };

  const printReceipt = (donation: Donation) => {
    const receiptWindow = window.open("", "_blank");
    receiptWindow?.document.write(`
      <h2>Donation Receipt</h2>
      <p><strong>Donation ID:</strong> ${donation.id}</p>
      <p><strong>User Email:</strong> ${donation.user_email}</p>
      <p><strong>Charity:</strong> ${donation.charity}</p>
      <p><strong>Amount:</strong> $${donation.amount}</p>
      <p><strong>Method:</strong> ${donation.method}</p>
      <p><strong>Date:</strong> ${new Date(donation.created_at).toLocaleString()}</p>
      <button onclick="window.print()">Print Receipt</button>
    `);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Manage Donations</h2>

      {/* Donation Form */}
      <div className="card p-4 mb-5 shadow-sm">
        <h4 className="mb-3">Make a Donation</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Charity Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter charity name"
              value={values.charity}
              onChange={e => setValues({ ...values, charity: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter amount"
              value={values.amount}
              onChange={e => setValues({ ...values, amount: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Method</label>
            <select
              className="form-select"
              value={values.method}
              onChange={e => setValues({ ...values, method: e.target.value })}
            >
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Bank Transfer</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Donate</button>
        </form>
      </div>

      {/* Donation History */}
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Donation History</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Email</th>
              <th>Charity</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
  {donations.length > 0 ? (
    donations.map(donation => (
      <tr key={donation.id}>
        <td>{donation.id}</td>
        <td>{donation.user_email}</td>
        <td>{donation.charity}</td>
        <td>${donation.amount}</td>
        <td>{donation.method}</td>
        <td>{new Date(donation.created_at).toLocaleString()}</td>
        <td>
          <button
            onClick={() => printReceipt(donation)}
            className="btn btn-outline-secondary btn-sm"
          >
            Print Receipt
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="text-center">No donations yet.</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default ManageDonations;
