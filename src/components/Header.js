import React from 'react'
import { Link } from 'react-router-dom'
import {  Dropdown, Menu, Icon } from 'antd'
import NavMenu from '../components/NavMenu'
import Avatar from './Avatar'
import '../styles/NavBar.css'

const Header = ({ user, handleLogout }) => {

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Icon type='setting' />
        <span>
          <Link to='/account'>Account</Link>
        </span>
      </Menu.Item>
      <Menu.Item key="1">
        <Icon type='form' />New Post
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Icon type='logout' />
        <span onClick={handleLogout}>Logout</span>
      </Menu.Item>
    </Menu>
  )
  
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

      {/* <div className='search'> */}

          <>
            {/* <div className='search-border'>
              <Input.Search 
                placeholder='Search...' 
                onSearch={(v, e) => console.log(v, e)}
                id='search'
              />
            </div> */}
            <div className='header-avatar'>
              <Link to={`/profile/${user.id}`}>
                <Avatar user={user} />
              </Link>
            </div>
            <div className='header-menu'>
              <Dropdown 
                overlay={menu} 
                trigger={['click']} 
              >
                <Icon type='more' />
              </Dropdown>
            </div>
          </>

      {/* </div> */}
    </div>
  )
}

export default Header