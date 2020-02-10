import React from 'react'
import { Icon, Avatar } from 'antd'
import moment from 'moment'

const ProfileCard = ({ user, posts, likedPosts }) => {
  
  return (
    <div className='profile-card segment'>
      <div className='profile-backsplash'>
        <img 
          alt='profile-backsplash' 
          src='https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80' />
      </div>
      
      <div className='profile-contents'>
        <div className='profile-avatar'>
          <Avatar size={120} src={user.avatar}/>
        </div>
        <div className='profile-subheader'>
          <h2 className='profile-name'>{user.name}</h2>
          <div>
            Member since: {moment(user.created_at).format('MMMM YYYY')}
          </div>
        </div>
        <div className='profile-stats'>
          <div>{posts.length} Authored posts</div>
          <div>{likedPosts.length} Liked posts</div>
          <div>15 Followers</div>
        </div>
        <div className='friend'>
          <Icon type="user-add" />
        </div>
      </div>
    </div>
  )
}

export default ProfileCard

// ProfileCard.defaultProps = {
//   user: {}
// }

//   < Card
// loading = { loading }
// size = 'small'
// cover = {< img alt = 'cover' src = 'https://images.pexels.com/photos/9044/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' style = {{ maxHeight: '200px' }}/>}
// style = {{ marginBottom: '10px' }}
//     >
//   <Card.Meta
//     title={<h3 style={{ marginTop: '-5px', position: 'relative', zIndex: '1' }}>{user.name}</h3>}
//     avatar={<Avatar src={user.avatar} size={64} style={{ marginTop: '-30px' }} />}
//     description={<p style={{ marginTop: '-20px' }}>Member since August 2018</p>}
//   />

// { user.bio !== '' ? 'Status: ' + user.bio : 'Status: Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
//     </Card >