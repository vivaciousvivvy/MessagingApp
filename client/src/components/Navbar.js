import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = () => {
  return (
    <nav>
        <h3>
            <Link to="/">Messenger</Link>
        </h3>
        <div>
          {auth.currentUser ? (
          <>
            <Link to='/profile'>Profile</Link>
            <button className='btn'>Logout</button>
          </> 
            ) : (
          <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
          </>
          )}
        </div>
    </nav>
  )
}

export default Navbar