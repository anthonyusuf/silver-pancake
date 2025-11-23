import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import background2 from "../components/background2.jpg";
import "../components/login.css";




function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false);

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
    <div> 

      <Link to="/" className="logo-link">WriteOffTrack</Link>

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
          filter: "brightness(.8)",
          zIndex: -1,
        }}
      />

     <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className= 'p-3 w-25 shadow rounded login-outline'>
          <form onSubmit = {handleSubmit} >
            <div className='mb-3'>
                <label htmlFor="firstname">First Name</label>
                <input type="text" placeholder='Enter First name' name='firstname'
                onChange={e => setValues({...values, firstname: e.target.value})}
                className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="lastname">Last Name</label>
                <input type="text" placeholder='Enter Last name' name='lastname'
                onChange={e => setValues({...values, lastname: e.target.value})}
                className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
               <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter Email' name='email'
                onChange={e => setValues({...values, email: e.target.value})}
                className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password">Password</label>
                <input type={showPassword ? "text" : "password"} placeholder='Enter Password' name='password'
                onChange={e => setValues({...values, password: e.target.value})}
                className='form-control rounded-0'/>
                <button
                 type="button"
                  className="btn btn-outline-secondary btn-sm mt-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            <button type='submit' className='btn btn-primary w-100 rounded-0'> Sign up</button>
            <p>Already have an account? <Link to="/log-in">Login</Link></p>
            
            </form>
        </div>
    </div>
    </div>
  )
}
export default Register