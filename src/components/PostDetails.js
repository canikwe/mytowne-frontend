import React from 'react'
import Tag from './Tag'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon, Avatar } from 'antd'
import { displayPostDate } from '../helper/functions'
import '../PostShow.css'

const PostDetails = ({ post, handleDelete, user, handleTagClick, handleLike }) => {
  const handleImage = e => e.target.remove()

  const isLiked = () => {
    return post.likes.find(l => l.user_id === user.id) ? 'filled' : 'outlined'
  }

  const menu = (
    <Menu>
      {user.id === post.user.id ?
        <>
          <Menu.Item>
            <Link to={`/posts/${post.id}/edit`} >
              Edit
            </Link> 
          </Menu.Item>
          <Menu.Item>
            <Link to="/" onClick={() => handleDelete(post.id)}>
              Delete
            </Link>
          </Menu.Item>
          <Menu.Divider />
        </> : null
      }
        <Menu.Item>Share</Menu.Item>
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
              
              {post.user.avatar === '' ?
                <Avatar 
                  style={{ backgroundColor: '#fde3cf', verticalAlign: 'middle' }} 
                  size="large"
                  className='post-avatar'
                >
                  {post.user.name[0].toUpperCase()}
                </Avatar>
                :
                <Avatar 
                  alt={post.user.name} 
                  src={post.user.avatar} 
                  size='large'
                  className='post-avatar'
                  style={{verticalAlign: 'middle'}}
                />
              }
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
                  <Dropdown overlay={menu} overlayStyle={{width: '100px'}}trigger={['click']}>
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
