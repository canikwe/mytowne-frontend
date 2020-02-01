import React from 'react'
import Filter from '../components/Filter'
import CardContainer from './CardContainer'

const Index = ({ posts, handleFilter, tags, user, addLike, removeLike, handleTagClick, filters }) => {

  return (
    <div id='index'>
      <Filter 
        handleFilter={handleFilter} 
        tags={tags}
        filters={filters}
      />
      <CardContainer 
        posts={posts} 
        user={user} 
        addLike={addLike} 
        removeLike={removeLike} 
        handleTagClick={handleTagClick} 
      />
    </div>
  )

}

export default Index
