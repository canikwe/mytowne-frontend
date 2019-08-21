import React, { Fragment }from 'react'
import Feature from './Feature'
import Filter from './Filter'
import CardContainer from './CardContainer'

const Home = (props) => {

  const { posts, handleFilter, tags, user, addLike, removeLike } = props
  return (
    <Fragment>
      <Feature />
      <Filter handleFilter={handleFilter} tags={tags}/>
      <CardContainer posts={posts} user={user} addLike={addLike} removeLike={removeLike}  />
    </Fragment>
  )
}

export default Home
