import React from 'react'
// import { Card, Avatar } from 'antd'
import PostListItem from '../components/PostListItem'

const PostList = ({ posts }) => {
  return (
    <div className='segment'>
      <div className='post-list-container'>
        <h3>Recent Posts</h3>
        <div>
          {posts.slice(0, 5).map(p => <PostListItem key={p.id} post={p} />)}
        </div>
      </div>
    </div>
  )
}

export default PostList