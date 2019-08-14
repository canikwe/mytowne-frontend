import React from 'react'
import CardContainer from './CardContainer'
import { Link } from 'react-router-dom'

const Profile = ({ user, userPosts }) => {

  return (
    <React.Fragment>
      {
        user.avatar !== "" ?
          <img src={user.avatar} alt="user avatar"/> 
        : null
      }
      <h2>{user.name}&nbsp;</h2>
      <p>{user.bio}</p>

      <div>
        {
          user.posts ? (
            <CardContainer posts={ userPosts } name={ user.name } avatar={ user.avatar } />
          ) 
          : null
        }
        <Link to={'/'} color="primary" >
          Back
        </Link>
        <Link to={`/profile/edit`} >
          Edit
        </Link>
      </div>
    </React.Fragment >
  )
}

export default Profile
