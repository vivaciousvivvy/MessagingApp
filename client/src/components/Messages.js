import React from 'react'
import Message from './Message'

const Messages = ({ messages, userName }) => {
  return (
    <main className='msger-chat'>
      {messages.map((message, i) => (
        <Message key={i} message={message} userName={userName}/>
      ))}
    </main>
  )
}

export default Messages