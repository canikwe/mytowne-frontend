import React from 'react'
import Filter from './Filter'
import CardContainer from './CardContainer'

const Home = (props) => {

  const { posts, handleFilter, tags } = props
  return (
    <React.Fragment>
      <Filter handleFilter={handleFilter} tags={tags}/>
      <CardContainer posts={posts} />
    </React.Fragment>
  )

}

export default Home
