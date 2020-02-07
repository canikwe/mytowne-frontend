import React from 'react'
import { Link } from 'react-router-dom'
import { displayPostDate } from '../helper/functions'

const PostListItem = ({ post: { title, img, id, created_at } }) => {
  return (
    <div className='post-item'>
      <img src={img} alt={title} />
      <span>
        <Link to={`/posts/${id}`}>{ title }</Link>
        <div className='date'>
          { displayPostDate(created_at) }
        </div>
      </span>
    </div>
  )
}

export default PostListItem