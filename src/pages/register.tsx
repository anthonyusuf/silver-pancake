import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'



function register() {
    const navigate = useNavigate()
  return (
     <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className= 'p-3 w-25 shadow sm'>
          <form action="">
            <div className='mb-3'>
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" placeholder='Enter Name' name='name'
                className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
<               label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email'
                className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password'
                className='form-control rounded-0'/>
            </div>
            <button type='submit' className='btn btn-primary w-100 rounded-0'> Sign up</button>
            <p>Already have an account?</p>
            <button type="button" className='btn btn-outline-primary w-100 rounded-0'
            onClick={() => navigate('/log-in')}> Login</button>
            </form>
        </div>
    </div>
  )
}
export default register