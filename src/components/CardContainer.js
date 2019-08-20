import React from 'react'
import Cards from '../containers/Cards'
import '../styles/Cards.css'



const CardContainer = ({ classes, posts, name, avatar }) => {

  return (
    <div className='card-container'>
      {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => name ? <Cards post={post} name={name} avatar={avatar} key={post.id} /> : <Cards post={post} key={post.id} /> )}
    </div>
  )
}

export default CardContainer
