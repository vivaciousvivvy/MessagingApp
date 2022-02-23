import React from 'react'
import { useRef } from 'react'
import Message from './Message'
import { useEffect } from 'react'

const Messages = ({ messages, userName }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(scrollToBottom, [messages]);
  


  return (
    <main className='msger-chat'>
      {messages.map((message, i) => (
        <Message key={i} message={message} userName={userName}/>
      ))}
    </main>
  )
}

export default Messages