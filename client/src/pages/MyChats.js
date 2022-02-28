import React, { useState, useEffect } from 'react'
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

const MyChats = () => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
      //WORKING FUNCTION DO NOT DELETE!!!!!
      getDoc(doc(db, "users' chats", auth.currentUser.uid)).then(docSnap => {
        if (docSnap.exists()) {
          let currentRoutes = [];
          currentRoutes = docSnap.get("routes");
          console.log("The chat routes are " + currentRoutes);
          setRoutes(currentRoutes);
        } else {
          console.log("No such document!");
        }
      })
    }, [])
    console.log("Outside the function!!!!" + routes);
    const routeString = routes + '';
    const routesArray = routeString.split(',');
    console.log("First Route" + routesArray[1]);


    return (
        <div>
            <li>Chat Rooms Here</li>
        </div>
    )
}

export default MyChats