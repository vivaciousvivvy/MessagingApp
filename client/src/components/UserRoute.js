import React from 'react'

const UserRoute = ({ route }) => {
    const routeArray = route.split('/');
  return (
    <li className='route-item'><a href={route}>{routeArray[2]}</a></li>
  )
}

export default UserRoute