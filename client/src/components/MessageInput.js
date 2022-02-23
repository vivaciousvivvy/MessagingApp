import React from 'react'

const MessageInput = () => {
  return (
      <form className='msger-inputarea'>
          <input ype='text' className='msger-input' placeholder='Message...' />
          <button className='msger-input-send' type='submit'>Send</button>
      </form>
  )
}

export default MessageInput