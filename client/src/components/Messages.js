import React from 'react'
import Message from './Message'

const Messages = ({ messages }) => {
  return (
    <main className='msger-chat'>
      {messages.map((message, i) => (
        <Message />
      ))}
    </main>
  )
}

export default Messages