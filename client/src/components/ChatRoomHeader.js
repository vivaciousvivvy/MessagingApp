import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { auth, db } from '../firebase';

const ChatRoomHeader = ({ roomId, userName }) => {
  const removeUser = (event) => {
    try {
      updateDoc(doc(db, "users' chats", auth.currentUser.uid), {
        routes: arrayRemove("/chatting/" + roomId + "/" + userName)
      });
    } catch (event) {
      console.error("Error adding document: ", event);
    }
  }

  return (
    <section className='msger'>
      <header className='msger-header'></header>
        <div className='msger-header-title'>
          MessageFast Room: {roomId}
        </div>
        <div className='msger-header-options'>
          <span><a href='/' onClick={removeUser}>Leave Group Chat</a></span>
        </div>
        <div className='msger-header-options'>
          <span><a href ='/mychats'>My Chats</a></span>
        </div>
    </section>
  )
}

export default ChatRoomHeader