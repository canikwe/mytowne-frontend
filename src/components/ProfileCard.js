import React from 'react'
import { Card, Avatar } from 'antd'

const ProfileCard = ({ user, loading }) => {
  console.log(user)
  return (
    <Card
      loading={loading}
      size='small'
      cover={<img alt='cover' src='https://images.pexels.com/photos/9044/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' style={{maxHeight: '200px'}}/>}
      style={{marginBottom: '10px'}}
    >
      <Card.Meta
        title={<h3 style={{marginTop: '-5px', position:'relative', zIndex: '1'}}>{user.name}</h3>}
        avatar={<Avatar src={user.avatar} size={64} style={{marginTop: '-30px'}}/>}
        description={<p style={{marginTop: '-20px'}}>Member since August 2018</p>}
      />

      {user.bio !== '' ? 'Status: ' + user.bio : 'Status: Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
    </Card>
  )
}

export default ProfileCard

ProfileCard.defaultProps = {
  user: {}
}