import React from 'react'
import { Card as LoadingCard } from 'antd'
import Card from '../containers/Card'

const PostFeed = ({ posts, loading }) => {
  const loadingPosts = () => [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  
  return (
    <div className='posts'>
      { loading ? 
        loadingPosts().map(p => <LoadingCard loading={true} />)
          : 
        posts.slice(1, 5).map(p => <Card key={p.id} post={p} loading={ loading } className='small' />) }
    </div>
  )
}

export default PostFeed