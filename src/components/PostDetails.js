import React from 'react'
import Tag from './Tag'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { Menu, Dropdown, Icon } from 'antd'
import { displayPostDate } from '../helper/functions'
import Comment from './Comment'
import '../PostShow.css'
import CommentsContainer from '../containers/CommentsContainer'

const PostDetails = ({ post, handleDelete, user, handleTagClick, handleLike }) => {
  const handleImage = e => e.target.remove()

  const isLiked = () => {
    return post.likes.find(l => l.user_id === user.id) ? 'filled' : 'outlined'
  }

  const defaultMenu = (
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
    <main id='post-details'>
      <div className='details-container'>
        <div className='segment' >
          <div className='post-header'>
            <div className='post-details-title'>
              <h2>{post.title}</h2>
            </div>

            <Avatar user={post.user} />

            <div className='post-subheader'>
              <div className='post-details-author'>
                <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
              </div>
              <div className='post-details-date'>
                {displayPostDate(post.created_at)}
              </div>
            </div>

            <div className='extra'>
              <span>
                <Icon type='message' />
              </span>
              <span className='clickable' onClick={() => handleLike(user.id, post)}>
                <Icon type='heart' theme={isLiked()} style={{color: 'red'}}/>
              </span>
              <span>
                <Dropdown overlay={user.id === post.user.id ? adminMenu : defaultMenu} overlayStyle={{width: '100px'}}trigger={['click']}>
                  <Icon type='more' />
                </Dropdown>
              </span>
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

            <CommentsContainer comments={post.comments}/>

          </div>

        </div>
      </div>
    </main>

  )
  
}

export default PostDetails
