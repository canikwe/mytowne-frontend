import React from 'react'
import Filter from '../components/Filter'
import CardContainer from './CardContainer'

const PostIndex = ({ posts, handleFilters, tags, user, addLike, removeLike, handleTagClick, filters, handleSearch, searchInput }) => {

  return (
    <main id='content'>
      <Filter 
        tags={tags}
        filters={filters}
        searchInput={searchInput}
        handleSearch={handleSearch}
        handleFilters={handleFilters}
      />

      { posts.length ?
        <CardContainer 
          posts={posts} 
          user={user} 
          addLike={addLike} 
          removeLike={removeLike} 
          // handleTagClick={handleTagClick} 
        />
          :
        <h1>No Posts Found :( </h1>
      }
    </main>
  )

}

export default PostIndex
