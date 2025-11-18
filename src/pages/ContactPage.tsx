import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Contact Admin</h2>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
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
            <label className="form-label">Your Email</label>
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
            <label className="form-label">Subject</label>
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
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows={5}
              placeholder="Enter your message"
              value={values.message}
              onChange={e => setValues({ ...values, message: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
