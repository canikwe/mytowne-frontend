import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

const NavigationBar = ({handleLogout, loggedIn, searchInput, handleSearch}) => {
  return(
    <div id='nav-container'>
      <ul>
        <li><Link to='/'>Home</Link></li>
        {loggedIn ? 
        <React.Fragment>
          <li id='search'>Search: <input className='search-bar' type='text' value={searchInput} onChange={handleSearch} /></li>
          <li id='menu'>Menu
            <ul class='menu-item'>
              <li><Link to='/profile'>My Profile</Link></li>
              <li><Link to='/profile/edit'>My Account</Link></li>
              <li><Link to='/posts/new'>Create a New Post</Link></li>
              <li><Link to='/login' onClick={handleLogout}>Logout</Link></li>
            </ul>
          </li>
        </React.Fragment>
        : null}
      </ul>
    </div>
  )
}

export default NavigationBar