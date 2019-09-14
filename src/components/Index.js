import React, { Fragment }from 'react'
import Filter from './Filter'
import CardContainer from './CardContainer'

const Index = ({ posts, handleFilter, tags, user, addLike, removeLike, handleTagClick }) => {

  return (
    <Fragment>
      <Filter handleFilter={handleFilter} tags={tags}/>
      <CardContainer posts={posts} user={user} addLike={addLike} removeLike={removeLike} handleTagClick={handleTagClick} />
    </Fragment>
  )
}

export default Index
