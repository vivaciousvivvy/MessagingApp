import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router'
import io from 'socket.io-client'
import ChatRoomHeader from '../components/ChatRoomHeader'
import MessageInput from '../components/MessageInput'
import Messages from '../components/Messages'

let socket;

const ChatPlatform = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const params = useParams();

  useEffect(() => {
    const {username, roomId } = params;
    socket = io('http://localhost:5000');
    setUserName(userName);
    setRoomId(roomId);

    socket.emit('join', { userName, roomId }, (error) => {
      if(error) 
        alert(error);
    })
  }, [params])
  

  return (
    <section>
      <ChatRoomHeader />
      <Messages />
      <MessageInput />
    </section>
  )
}

export default ChatPlatform