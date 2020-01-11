import React from 'react'
import { Card, Avatar } from 'antd'

const ChatBox = () => {
  return (
    <Card>
      <h3>ChatBox</h3>
      <ul>
        <li><Avatar /> John Doe</li>
        <li><Avatar /> John Doe</li>
        <li><Avatar /> John Doe</li>
        <li><Avatar /> John Doe</li>

      </ul>
    </Card>
  )
}

export default ChatBox