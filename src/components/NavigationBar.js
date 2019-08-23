import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

const NavigationBar = ({handleLogout, loggedIn, searchInput, handleSearch}) => {
  return(
    <div id='outter-nav-container'>

    <div id='nav-container'>
      <ul>
        <li id='menu'>
          <i className="material-icons">menu</i>
          <ul id='menu-item'>
            <li><Link to='/profile'>My Profile</Link></li>
            <li><Link to='/profile/edit'>My Account</Link></li>
            <li><Link to='/posts/new'>Create a New Post</Link></li>
            <li><Link to='/login' onClick={handleLogout}>Logout</Link></li>
          </ul>
        </li>
        <li><Link to='/'>myTowne</Link></li>
        {loggedIn ? 
          <li id='search'>Search: <input className='search-bar' type='text' value={searchInput} onChange={handleSearch} /></li>
          : null}
      </ul>
    </div>
          </div>
  )
}

export default NavigationBar