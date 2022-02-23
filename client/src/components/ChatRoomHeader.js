import React from 'react'

const ChatRoomHeader = ({ roomName }) => {
  return (
    <section className='msger'>
      <header className='msger-header'></header>
        <div className='misger-header-title'>
          MessageFast [Room ID]
        </div>
        <div className='mesger-header-options'>
          <span><a href='/'>Leave Chat Room</a></span>
        </div>
    </section>
  )
}

export default ChatRoomHeader