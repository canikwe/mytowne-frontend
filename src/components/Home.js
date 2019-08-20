import React, { Fragment }from 'react'
import Feature from './Feature'
import Filter from './Filter'
import CardContainer from './CardContainer'

const Home = (props) => {

  const { posts, handleFilter, tags, currentUser, handleLike } = props
  return (
    <Fragment>
      <Feature />
      <Filter handleFilter={handleFilter} tags={tags}/>
      <CardContainer posts={posts} currentUser={currentUser} handleLike={handleLike}  />
    </Fragment>
  )
}

export default Home
