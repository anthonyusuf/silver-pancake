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
  const { name, email, password } = req.body;
  const sql = "INSERT INTO Login (name, email, password) VALUES (?)";

  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) return res.status(500).json({ Error: "Password hashing error" });

    const values = [name, email, hash];

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
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, reponse) => {
                if(err) return res.json({Error: "Password compare error"});
                if(reponse) {
                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-key", {expiresIn: "1d"});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                }
                else {
                    return res.json({Error: "Password not matched"})
                }
                
            })
        } else return res.json({Error: "No email"});
})
})

app.get('/auth/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: "Success" });
});



app.listen(8081, () => {
    console.log("Working")
})