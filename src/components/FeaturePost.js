import React from 'react'
import Card from '../containers/Card'

const FeaturePost = ({ post, loading }) => {
  if (loading || !post) {
    return <h1>Loading...</h1>
  }
  
  return (
    <div id='feature'>
      <Card className='regular feature' post={post}/>
    </div>
  )
}

export default FeaturePost