import React from 'react'
import ChatRoomHeader from '../components/ChatRoomHeader'
import MessageInput from '../components/MessageInput'
import Messages from '../components/Messages'

const ChatPlatform = () => {
  return (
    <section>
      <ChatRoomHeader />
      <Messages />
      <MessageInput />
    </section>
  )
}

export default ChatPlatform