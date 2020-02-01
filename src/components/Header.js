import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'antd'
import NavMenu from '../components/NavMenu'
import '../styles/NavBar.css'

const Header = ({ loggedIn }) => {
  
  return(
    <div id='header'>
      <div className='item1'>
        <img src={require('../helper/cityscape.svg')} alt='home' id='header-logo'/>
      </div>

      <div className='item2'>
        <Link to='/home'>
          <h1 id='header-title'>myTowne</h1>
        </Link>
      </div>

      <div className='item3'>
        <NavMenu />
      </div>

      <div className='item4'>
        { loggedIn ? 
          <div className='search-border'>
            <Input.Search 
              placeholder='Search...' 
              onSearch={(v, e) => console.log(v, e)}
              id='search'
            />
          </div>
          : null
        }
      </div>
    </div>
  )
}

export default Header