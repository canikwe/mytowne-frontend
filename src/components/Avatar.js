import React from 'react'
import { Avatar as AntAv } from 'antd'

const Avatar = ({ user }) => {
  if (user.avatar === '') {

    return <AntAv
      style={{ backgroundColor: '#fde3cf', verticalAlign: 'middle' }}
      size="large"
      className='post-avatar'
    >
      {user.name[0].toUpperCase()}
    </AntAv>
  }

  return (
    <AntAv
      src={user.avatar}
      size='large'
      className='post-avatar'
      style={{ verticalAlign: 'middle' }}
    />
  )
}

export default Avatar