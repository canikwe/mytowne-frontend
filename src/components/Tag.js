import React from 'react'
import { Link } from 'react-router-dom'

const Tag = ({ tag, handleTagClick }) => {
  return (
    <Link to='/posts'>
      <span onClick={() => handleTagClick(tag)} className='tag'> {tag.tag_name} </span>
    </Link>
  )
}

export default Tag