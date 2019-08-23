import React from 'react'
// import '../images'

const Feature = ({user}) => {
  return(
    <div id='feature-container'>
      <h1 id='feature-title'>Welcome to {user.town}, {user.name}!</h1>
      <img
      id='feature'
      src='/images/apartment-architecture-city-415687.jpg' alt='feature-img' />
    </div>
  )
}

export default Feature