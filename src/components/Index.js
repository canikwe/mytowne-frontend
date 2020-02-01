import React from 'react'
import Filter from './Filter'
import CardContainer from '../containers/CardContainer'

const Index = ({ posts, handleFilter, tags, user, addLike, removeLike, handleTagClick }) => {

  return ( //maybe get rid of index as a container?
    <>
      <Filter 
        handleFilter={handleFilter} 
        tags={tags}
      />
      <CardContainer 
        posts={posts} 
        user={user} 
        addLike={addLike} 
        removeLike={removeLike} 
        handleTagClick={handleTagClick} 
      />
    </>
  )
}

export default Index
