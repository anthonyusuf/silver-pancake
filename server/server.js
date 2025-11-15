import express from 'express';
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';  

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({ 
    host:"localhost",
    user: "root",
    password: "",
    database: 'signup'
})

app.listen(8801, () => {
    console.log("Working")
})