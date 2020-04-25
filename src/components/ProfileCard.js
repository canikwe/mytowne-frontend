import React from 'react'
import { Icon, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ProfileCard = ({ user, currentUserId, likedPosts, posts, editable, handleEdit, editing, followUser }) => {
  
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

          <div className='edit-subheader'>
            <h2 className='profile-name'>{user.name}</h2>
              {editable ? <Link to='/account'><Icon type='edit' onClick={handleEdit} /></Link> : null}
          </div>
          
          <div>
            Member since: {moment(user.created_at).format('MMMM YYYY')}
          </div>
        </div>
        <div className='profile-stats'>
          <div>{posts.length} Authored posts</div>
          <div>{likedPosts.length} Liked posts</div>
          <div>{`${user.follower_ids.length} Followers`}</div>
        </div>
        <div className='friend'>
          <Icon type="user-add" onClick={() => followUser({follower_id: currentUserId, followed_id: user.id})} />
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
