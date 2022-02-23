import React from 'react'

const MessageInput = ({ sendMessage, message, setMessage}) => {
  return (
      <form className='msger-inputarea'>
          <input ype='text' className='msger-input'
          placeholder='Message...'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === 'Enter' ? sendMessage(event) : ''}
          />
          <button className='msger-send-btn' type='submit' onClick={(event) => sendMessage(event)}>Send</button>
      </form>
  )
}

export default MessageInput