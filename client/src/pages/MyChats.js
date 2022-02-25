import React from 'react'
import { doc, getDoc, } from "firebase/firestore";
import { db, auth } from '../firebase';

const MyChats = () => {
    let chatroutes = [];
    
    //Find out how to query
    //Cannot access docSnap outside of docSnap getDoc function
    async function getChats() {
      const docRef = doc(db, "users' chats", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists())
      {
        console.log("Routes!!!!" + docSnap.get("routes"));
        return docSnap.data();
      }
      return [];
    }

    chatroutes = getChats();

    /*
    getDoc(doc(db, "users' chats", auth.currentUser.uid)).then(docSnap => {
        if (docSnap.exists()) {
          chatroutes = docSnap.get("routes");
          console.log("The chat routes are " + chatroutes);
        } else {
          console.log("No such document!");
        }
      })
      */

      //Console.log statement displaying empty array
      console.log("These are the chat routes!!" + chatroutes);

    return (
        <div>
            <li>{auth.currentUser.uid}</li>
        </div>
    )
}

export default MyChats