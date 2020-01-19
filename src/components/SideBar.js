import React from 'react'
import Weather from '../components/Weather'
import ChatBox from '../components/ChatBox'

const SideBar = () => {
  return (
    <div id='sidebar'>
      <Weather />
      <ChatBox />
    </div>
  )
}

export default SideBar