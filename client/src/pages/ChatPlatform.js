import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import io from 'socket.io-client'
import ChatRoomHeader from '../components/ChatRoomHeader'
import MessageInput from '../components/MessageInput'
import Messages from '../components/Messages'

let socket;

const ChatPlatform = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const params = useParams();

  useEffect(() => {
    const {userName, roomId } = params;
    socket = io('http://localhost:5000');
    setUserName(userName);
    setRoomId(roomId);

    socket.emit('join', { userName, roomId }, (error) => {
      if(error) 
        alert(error);
    })
  }, [params])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    })
    
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })
  }, [])
  
  

  return (
    <section>
      <ChatRoomHeader />
      <Messages messages={messages} userName={userName}/>
      <MessageInput />
    </section>
  )
}

export default ChatPlatform