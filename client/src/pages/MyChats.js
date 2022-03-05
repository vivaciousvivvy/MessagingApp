import React, { useState, useEffect } from 'react'
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';
import UserRoute from '../components/UserRoute';

const MyChats = () => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
      //WORKING FUNCTION DO NOT DELETE!!!!!
      getDoc(doc(db, "users' chats", auth.currentUser.uid)).then(docSnap => {
        if (docSnap.exists()) {
          let currentRoutes = [];
          currentRoutes = docSnap.get("routes");
          setRoutes(currentRoutes);
        } else {
          console.log("No such document!");
        }
      })
    }, [])
    const routeString = routes + '';
    const routesArray = routeString.split(',');
    let routeNum = 1;


    return (
        <div>
            <div className='user-routes'>
                <h1 className='user-routes-header'> Your Chats</h1>
                {routesArray.map(route => <UserRoute key={routeNum++} route = {route} />)}
            </div>
        </div>
    )
}

export default MyChats