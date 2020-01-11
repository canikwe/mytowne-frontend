import React from 'react'
import PostCard from '../components/PostCard'

const PostFeed = ({ posts, loading }) => {
  return (
    <>
      { posts.map(p => <PostCard key={p.id} post={p} loading={ loading }/>) }
    </>
  )
}

export default PostFeed