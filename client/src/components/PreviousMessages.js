import React from 'react'
import { useRef } from 'react'
import PreviousMessage from './PreviousMessage'
import { useEffect } from 'react'

const PreviousMessages = ({ messages, userName }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    useEffect(scrollToBottom, [messages]);
    
  
  
    return (
      <main className='msger-chat'>
        {messages.map((message, i) => (
          <PreviousMessage key={i} message={message} userName={userName}/>
        ))}
        <div ref={messagesEndRef} />
      </main>
    )
}

export default PreviousMessages