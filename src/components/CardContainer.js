import React from 'react'
import Card from '../containers/Card'
import '../styles/Cards.css'



const CardContainer = ({ posts, user, addLike, removeLike, handleTagClick }) => {

  return (
    <div className='card-container'>
      {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(post => <Card post={post} key={post.id} user={user} addLike={addLike} removeLike={removeLike} handleTagClick={handleTagClick}/> )}
    </div>
  )
}

export default CardContainer
