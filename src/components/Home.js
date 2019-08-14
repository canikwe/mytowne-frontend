import React, { Fragment }from 'react'
import Filter from './Filter'
import CardContainer from './CardContainer'

const Home = (props) => {

  const { posts, handleFilter, tags } = props
  return (
    <Fragment>
      <Filter handleFilter={handleFilter} tags={tags}/>
      <CardContainer posts={posts} />
    </Fragment>
  )
}

export default Home
