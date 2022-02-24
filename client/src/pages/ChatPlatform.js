import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import io from 'socket.io-client'
import ChatRoomHeader from '../components/ChatRoomHeader'
import MessageInput from '../components/MessageInput'
import Messages from '../components/Messages'
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion} from "firebase/firestore"; 

let socket;

const ChatPlatform = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const currentUserId = auth.currentUser.uid;
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

    getDoc(doc(db, "users' chats", currentUserId)).then(docSnap => {
      if (!docSnap.exists()) {
        setDoc(doc(db, "users' chats", currentUserId), {
          routes: arrayUnion("/chatting/" + roomId + "/" + userName)
        });
      }
    })

    try {
      updateDoc(doc(db, "users' chats", currentUserId), {
        routes: arrayUnion("/chatting/" + roomId + "/" + userName)
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [params, currentUserId])

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
    
      getDoc(doc(db, "chat history", roomId)).then(docSnap => {
        if (!docSnap.exists()) {
          setDoc(doc(db, "chat history", roomId), {
            messages: arrayUnion(currentUserId + ":" + message)
          });
        }
      })

      try {
        updateDoc(doc(db, "chat history", roomId), {
          messages: arrayUnion(currentUserId + ":" + message)
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }

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