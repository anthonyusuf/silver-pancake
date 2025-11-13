import { Button } from '@mui/material'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


function login() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className= 'p-3 w-25 shadow sm'>
          <form action="">
            <div className='mb-3'>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Enter Email' className='form-control'/>
              </div>
              <div className= 'mb-3'>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Enter Password ' className='form-control'/>
            </div>
            <Button className='btn btn-success'>Login</Button>
            </form>
        </div>
    </div>
  )
}


export default login



