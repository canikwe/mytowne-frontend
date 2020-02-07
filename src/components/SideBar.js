import React from 'react'
import Weather from '../components/Weather'
import ChatBox from '../components/ChatBox'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <Weather />
      <ChatBox />
    </div>
  )
}

export default SideBar