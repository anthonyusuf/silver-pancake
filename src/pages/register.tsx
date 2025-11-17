import { Button } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'




function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://localhost:8081/register', values)
  .then(res => {
  console.log(res.data);
  if (res.data.Status === "Success") {
    navigate('/log-in');
  } else {
    alert(res.data.Error || "Registration failed");
  }
})
  .catch(err => console.log(err));


  }
    
  return (
     <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className= 'p-3 w-25 shadow sm'>
          <form onSubmit = {handleSubmit} >
            <div className='mb-3'>
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" placeholder='Enter Name' name='name'
                onChange={e => setValues({...values, name: e.target.value})}
                className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
               <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email'
                onChange={e => setValues({...values, email: e.target.value})}
                className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password'
                onChange={e => setValues({...values, password: e.target.value})}
                className='form-control rounded-0'/>
            </div>

            <div className='mb-3'>
             <label><strong>Role</strong></label>
                <select
                className="form-control rounded-0"
                value={values.role}
                onChange={e => setValues({ ...values, role: e.target.value })}
                >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type='submit' className='btn btn-primary w-100 rounded-0'> Sign up</button>
            <p>Already have an account?</p>
            <Link to="/log-in" className='btn btn-outline-primary w-100 rounded-0'>
             Login</Link>
            </form>
        </div>
    </div>
  )
}
export default Register