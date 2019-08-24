import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

class NavigationBar extends Component {
  constructor(){
    super()
    this.state = {
      menuOpen: false
    }
  }

  handleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render(){
    const { handleLogout, loggedIn, searchInput, handleSearch, userId } = this.props
    const menuOpen = this.state.menuOpen
    console.log(userId)
    return(
          <div id='outter-nav-container'>
        
          <div id='nav-container'>
            <ul>
              <li id='menu'>
                <i className="material-icons" onClick={this.handleMenu}>menu</i>
                <ul className={menuOpen ? 'clicked-menu' : 'menu-item'}>
                  <li onClick={this.handleMenu}><Link to={`/profile/${userId}`}>My Profile</Link></li>
                  <li onClick={this.handleMenu}><Link to='/profile/edit'>My Account</Link></li>
                  <li onClick={this.handleMenu}><Link to='/posts/new'>Create a New Post</Link></li>
                  <li onClick={this.handleMenu}><Link to='/login' onClick={handleLogout}>Logout</Link></li>
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
}

export default NavigationBar