import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import io from 'socket.io-client'
import ChatRoomHeader from '../components/ChatRoomHeader'
import MessageInput from '../components/MessageInput'
import Messages from '../components/Messages'
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 

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

    try {
      updateDoc(doc(db, "chats", roomId), {
        users: arrayUnion(userName)
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [params])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    })
    
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })
  }, [])
  

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  //console.log(users);

  return (
    <section>
      <ChatRoomHeader roomId={roomId}/>
      <Messages messages={messages} userName={userName}/>
      <MessageInput sendMessage={sendMessage} message={message} setMessage={setMessage}/>
    </section>
  )
}

export default ChatPlatform