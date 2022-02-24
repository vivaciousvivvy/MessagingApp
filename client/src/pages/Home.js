import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [userName, setUserName] = useState('');
  const[roomId, setRoomId] = useState('');
  return (
    <div className='content-join-form'>
      <label>Enter Your Nick Name : </label>
      <input type='text' placeholder='Nick Name' className='inputBox' onChange={(event) => setUserName(event.target.value)} />
      <br/>
      <br/>
      <label>Enter Room ID : </label>
      <input type='text' className='input' onChange={(event) => setRoomId(event.target.value)}/>
      <Link to={userName && roomId ? `chatting/${roomId}/${userName}` : ''}>
        <button className='btn-join'>Join</button>
      </Link>
    </div>
  )
}

export default Home