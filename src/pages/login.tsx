import background2 from "../components/background2.jpg";
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../components/login.css"



function Login() {

  const navigate = useNavigate()
  axios.defaults.withCredentials=true;
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://localhost:8081/log-in', values)
      .then(res => {
        console.log(res.data);
        if (res.data.Status === "Success") {
          localStorage.setItem("valid", "true");
          localStorage.setItem("firstname", res.data.firstname);
          localStorage.setItem("lastname", res.data.lastname);
          localStorage.setItem("userEmail", res.data.email);
          localStorage.setItem("role", res.data.role);

          if (res.data.role === "admin") {
            navigate('/admin-dashboard');
          } else {
            navigate('/user-dashboard');
          }
        } else {
          alert(res.data.Error || "Invalid Inputs");
        }
      })
      .catch(err => console.error("Login error:", err));
  };
    
  return (
    
    <div>
      <Link to="/" className="logo-link"> WriteOffTrack </Link>

      <img src={background2} alt="Background" style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          objectFit: "cover",
          filter: "brightness(.8)",
          zIndex: -1,
        }}/>

        <div className='d-flex justify-content-center align-items-center vh-100'>
         <div className= "p-3 w-25 shadow rounded login-outline">
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Enter Email' 
              className='form-control'
              onChange={e => setValues({...values, email: e.target.value})}/>
              </div>
              <div className= 'mb-3'>
              <label htmlFor="password">Password</label>
              <input type={showPassword ? "text" : "password"} placeholder='Enter Password ' 
              className='form-control'
              onChange={e => setValues({...values, password: e.target.value})}/>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm mt-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          
              <button type="submit" className='btn btn-success w-100 rounded-0'>Login</button>
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
          </div>
        </div>
      </div>
    
  )
}


export default Login



