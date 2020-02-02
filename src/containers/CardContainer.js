import React from 'react'
import Card from './Card'
import '../styles/Cards.css'



const CardContainer = ({ posts, user, addLike, removeLike, handleTagClick }) => {

  return (
    <div className='card-container'>
      {posts.map(post => {

        const like = post.likes.find(like => like.user_id === user.id)

        return <Card 
          key={post.id} 
          post={post} 
          user={user} 
          addLike={addLike} 
          removeLike={removeLike} 
          // handleTagClick={handleTagClick}
          like={like}
        /> 
      }
      )}
    </div>
  )
}

export default CardContainer
