import React from 'react'
import { Avatar as Av } from 'antd'

const Avatar = ({ user }) => {
  if (user.avatar === '') {

    return <Av
      style={{ backgroundColor: '#fde3cf', verticalAlign: 'middle' }}
      size="large"
      className='post-avatar'
    >
      {user.name[0].toUpperCase()}
    </Av>
  }

  return (
    <Av
      src={user.avatar}
      size='large'
      className='post-avatar'
      style={{ verticalAlign: 'middle' }}
    />
  )
}

export default Avatar