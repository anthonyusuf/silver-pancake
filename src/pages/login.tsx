import { Button } from '@mui/material'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



function login() {

  const navigate = useNavigate()
  axios.defaults.withCredentials=true;
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://localhost:8081/log-in', values)
  .then(res => {
    console.log(res);
    if (res.data.Status === "Success") {
      navigate('/dashboard');
    } else {
      alert("Invalid Inputs");
    }
  })
  .catch(err => console.log(err));


  }
    
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className= 'p-3 w-25 shadow sm'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Enter Email' 
              className='form-control'
              onChange={e => setValues({...values, email: e.target.value})}/>
              </div>
              <div className= 'mb-3'>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Enter Password ' 
              className='form-control'
              onChange={e => setValues({...values, password: e.target.value})}/>
            </div>
          
              <Button type="submit" className='btn btn-outline-primary w-100 rounded-0'>Login</Button>
              <p>Don't have an account?</p>
              <Link to="/register" className='btn btn-outline-primary w-100 rounded-0'>
                         Create account</Link>
            </form>
        </div>
    </div>
  )
}


export default login



