import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import background2 from "../components/background2.jpg";
import "../components/login.css"; // reuse same glass + text styles
import { Link } from 'react-router-dom'

function ContactPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post("http://localhost:8081/contact", values)
      .then(res => {
        if (res.data.Status === "Message Sent") {
          alert("Message sent to admin inbox!");
          setValues({ name: "", email: "", subject: "", message: "" });
        } else {
          alert(res.data.Error || "Failed to send message");
        }
      })
      .catch(err => console.error("Error sending message:", err));
  };

  return (
    <div>
      <Link to="/" className="logo-link"> WriteOffTrack </Link>

      {/* Background image */}
      <img
        src={background2}
        alt="Background"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          objectFit: "cover",
          filter: "blur(1px) brightness(.8)",
          zIndex: -1,
        }}
      />

      {/* Centered glass card */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="p-4 w-50 shadow rounded login-outline">
          <p style={{ fontWeight: "bold", fontSize: "24px" }}>Contact Us</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={values.name}
                onChange={e => setValues({ ...values, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={values.email}
                onChange={e => setValues({ ...values, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter subject"
                value={values.subject}
                onChange={e => setValues({ ...values, subject: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Enter your message"
                value={values.message}
                onChange={e => setValues({ ...values, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;