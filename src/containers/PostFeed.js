import React from 'react'
import PostCard from '../components/PostCard'

const PostFeed = ({ posts, loading }) => {
  const loadingPosts = () => [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  return (
    <>
      { loading ? 
        loadingPosts().map(p => <PostCard key={p.id} post={p} loading={loading} />)
          : 
        posts.map(p => <PostCard key={p.id} post={p} loading={ loading }/>) }
    </>
  )
}

export default PostFeed