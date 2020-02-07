import React from 'react'
// import Weather from '../components/Weather'
import PostList from '../containers/PostList'

const SideBar = ({ posts }) => {
  return (
    <div className='sidebar'>
      {/* <Weather /> */}
      <PostList posts={posts}/>
    </div>
  )
}

export default SideBar