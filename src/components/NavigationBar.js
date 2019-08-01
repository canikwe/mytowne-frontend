import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

const NavigationBar = ({handleLogout, loggedIn}) => {
  return(
    <ul id='nav'>
      <li><Link to='/'>Home</Link></li>
      {loggedIn ? 
      <React.Fragment>
        <li><Link to='/profile'>My Profile</Link></li>
        <li><Link to='/profile/edit'>My Account</Link></li>
      </React.Fragment>
      : null}
      <li id='logout'><Link to='/login' onClick={handleLogout}>Logout</Link></li>
    </ul>
  )
}

export default NavigationBar