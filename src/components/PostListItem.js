import React from 'react'
import { Link } from 'react-router-dom'
import { displayPostDate, replaceMissingImg } from '../helper/functions'

const PostListItem = ({ post: { title, img, id, created_at } }) => {
  return (
    <div className='post-item'>
      <img src={img} alt={title} onError={replaceMissingImg}/>
      <div className='list-title'>
        <Link to={`/posts/${id}`}>{ title }</Link>
      </div>
      <div className='list-content date'>
        { displayPostDate(created_at) }
      </div>
    </div>
  )
}

export default PostListItem