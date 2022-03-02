import React from 'react'

const ChatRoomHeader = ({ roomId }) => {
  return (
    <section className='msger'>
      <header className='msger-header'></header>
        <div className='msger-header-title'>
          MessageFast Room: {roomId}
        </div>
        <div className='msger-header-options'>
          <span><a href='/'>Leave Group Chat</a></span>
        </div>
        <div className='msger-header-options'>
          <span><a href ='/mychats'>My Chats</a></span>
        </div>
    </section>
  )
}

export default ChatRoomHeader