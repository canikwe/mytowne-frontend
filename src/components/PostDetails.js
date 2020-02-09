import React from 'react'
import Tag from './Tag'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { Menu, Dropdown, Icon } from 'antd'
import { displayPostDate } from '../helper/functions'
import '../PostShow.css'

const PostDetails = ({ post, handleDelete, user, handleTagClick, handleLike }) => {
  const handleImage = e => e.target.remove()

  const isLiked = () => {
    return post.likes.find(l => l.user_id === user.id) ? 'filled' : 'outlined'
  }

  const menu = (
    <Menu>
      <Menu.Item key='2'>Share</Menu.Item>
    </Menu>
  )

  const adminMenu = (
    <Menu>
      <Menu.Item key='0'>
        <span>
          <Link to={`/posts/${post.id}/edit`} >
            Edit
              </Link>
        </span>
      </Menu.Item>
      <Menu.Item key='1'>
        <Link to="/" onClick={() => handleDelete(post.id)}>
          Delete
            </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='2'>Share</Menu.Item>
    </Menu>
  )

  return (
    <div className='post-details'>
      <div className='segment' >
        {/* <div> */}
          <div className='post-header'>
            <div>
              <h2>{post.title}</h2>
            </div>
            <div className='post-subheader'>
              <Avatar user={post.user} />
              <div className='post-author'>
                <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
              </div>
              <div className='post-details-date'>
                {displayPostDate(post.created_at)}
              </div>
              <div className='extra'>
                <span>
                  <Icon type='message' />
                </span>
                <span onClick={() => handleLike(user.id, post)}>
                  <Icon type='heart' theme={isLiked()} style={{color: 'red'}}/>
                </span>
                <span>
                  <Dropdown overlay={user.id === post.user.id ? adminMenu : menu} overlayStyle={{width: '100px'}}trigger={['click']}>
                    <Icon type='more' />
                  </Dropdown>
                </span>
              </div>
            </div>
          </div>

          <div>
            <img 
              src={post.img} 
              alt={`${post.title}`} 
              className='card-image'
              onError={handleImage}
            /> 
          </div>

          <div className='post-content'>
            {post.content}
          </div>
          

          <div className='extra-content'>
            {post.post_tags.map(tag => <Tag key={tag.id} tag={tag} handleTagClick={handleTagClick}/>)}

            <hr />

            <textarea placeholder='Add a Comment!'></textarea>

            <h3>Comments:</h3>
            <div className='comment-container'>
              <div className='comment'>
                <Icon type='message' /> <span className='segment'>Hello</span>
              </div>
              <div className='comment'>
                <Icon type='message' /> <span className='segment'>Goodbye</span>
              </div>
            </div>
          </div>

        {/* </div> */}
      </div>
    </div>
  )
  
}

export default PostDetails
