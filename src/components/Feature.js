import React from 'react'
import Card from '../containers/Card'
import { Carousel } from 'antd'

const Feature = ({ loading }) => {
  if (loading) {
    return <h1>Loading...</h1>
  }
  
  return (
    <div id='feature-container'>
      {/* <Card className='regular feature' post={post}/> */}
      <Carousel autoplay>
        <div className='feature'>
          <h3>Welcome</h3>
        </div>
        <div className='feature'>
          <h3>2</h3>
        </div>
        <div className='feature'>
          <h3>3</h3>
        </div>
        <div className='feature'>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  )
}

export default Feature