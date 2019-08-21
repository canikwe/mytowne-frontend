import React from 'react'
// import '../images'

const Feature = ({user}) => {
  return(
    <React.Fragment>
      <h1 id='feature-title'>Welcome to {user.town}, {user.name}!</h1>
      <img
      id='feature'
      src='/images/apartment-architecture-city-415687.jpg' alt='feature-img' />
    </React.Fragment>
  )
}

export default Feature