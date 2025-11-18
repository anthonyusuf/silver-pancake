import React, { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

function Inbox() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8081/messages")
      .then(res => setMessages(res.data))
      .catch(err => console.error("Error fetching messages:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Admin Inbox</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(msg => (
            <tr key={msg.id}>
              <td>{msg.id}</td>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.subject}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.created_at).toLocaleString()}</td>
            </tr>
          ))}
          {messages.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">No messages yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Inbox;
