import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='content-join-form'>
      <label>Enter Your Nick Name : </label>
      <input type='text' placeholder='Nick Name' className='inputBox' />
      <br/>
      <br/>
      <label>Enter Room ID : </label>
      <input type='text' className='input' />
      <Link to='/chatting/:roomId/:userName'>
        <button className='btn-join'>Join</button>
      </Link>
    </div>
  )
}

export default Home