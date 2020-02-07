import React from 'react'

const PostListItem = ({ post: { title } }) => {
  return (
    <li>{ title }</li>
  )
}

export default PostListItem