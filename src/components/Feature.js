import React from 'react'
import { Carousel } from 'antd'

const Feature = ({ loading }) => {
  if (loading) {
    return <h1>Loading...</h1>
  }
  
  return (
    <div id='feature-container'>
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