import express from 'express';
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';

const salt = 10;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));

const db = mysql.createConnection({ 
    host:"localhost",
    user: "root",
    password: "",
    database: 'signup'
    
});


app.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  const sql = "INSERT INTO login (name, email, password, role) VALUES (?)";

  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) return res.status(500).json({ Error: "Password hashing error" });

    const values = [name, email, hash, role || 'user']; 

    db.query(sql, [values], (err, result) => {
      if (err) return res.status(500).json({ Error: "Insert data error" });
      return res.status(200).json({ Status: "Success" });
    });
  });
});

  
app.post('/log-in', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err,data) => {
    if(err) return res.json({Error: "Login error in server"});
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});
                if (response) {
                  const name = data[0].name;
                  const role = data[0].role;
                  const token = jwt.sign({ name, role }, "jwt-key", { expiresIn: "1d" });
                  res.cookie("token", token, {
                   httpOnly: false,
                  secure: false,
                  sameSite: "lax",
                });
                return res.json({ Status: "Success", role, email: data[0].email, name: data[0].name });
                }

                else {
                    return res.json({Error: "Invalid Password"})
                }
                
            })
        } else return res.json({Error: "No email"});
})
});

// Insert donation
app.post('/donate', (req, res) => {
  const { user_email, charity, amount, method } = req.body;
  const sql = "INSERT INTO donations (user_email, charity, amount, method) VALUES (?)";
  const values = [user_email, charity, amount, method];

  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).json({ Error: "Failed to process donation" });
    return res.status(200).json({ Status: "Donation Successful", donationId: result.insertId });
  });
});

// Fetch donations
app.get('/donations', (req, res) => {
  const { user_email } = req.query;
  const sql = "SELECT * FROM donations WHERE user_email = ? ORDER BY created_at DESC";
  db.query(sql, [user_email], (err, data) => {
    if (err) return res.status(500).json({ Error: "Failed to fetch donations" });
    return res.json(data);
  });
});

// Public contact form
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  const sql = "INSERT INTO messages (name, email, subject, message) VALUES (?)";
  const values = [name, email, subject, message];

  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).json({ Error: "Failed to send message" });
    return res.status(200).json({ Status: "Message Sent" });
  });
});

// Admin fetch inbox
app.get('/messages', (req, res) => {
  const sql = "SELECT * FROM messages ORDER BY created_at DESC";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ Error: "Failed to fetch messages" });
    return res.json(data);
  });
});


app.get('/auth/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: "Success" });
});



app.listen(8081, () => {
    console.log("Working")
})