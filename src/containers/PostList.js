import React from 'react'
import { Card, Avatar } from 'antd'
import PostListItem from '../components/PostListItem'

const PostList = ({ posts }) => {
  return (
    <div className='other'>
      <div className='segment'>
        <h3>Recent Posts</h3>
        <ul>
          {posts.slice(0, 9).map(p => <PostListItem key={p.id} post={p} />)}
        </ul>
      </div>
    </div>
  )
}

export default PostList