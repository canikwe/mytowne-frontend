import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Dropdown, Avatar, Menu, Icon } from 'antd'
import NavMenu from '../components/NavMenu'
// import Avatar from './Avatar'
import '../styles/NavBar.css'

const Header = ({ loggedIn, user, handleLogout }) => {

  const [toggle, updateToggle] = useState(false)

  const handleToggle = () => updateToggle(!toggle)

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Icon type='setting' />
        {/* <Link to='/profile/edit'>Settings</Link> */}
        <span>Settings</span>
      </Menu.Item>
      <Menu.Item key="1">
        <Icon type='logout' />
        <span onClick={handleLogout}>Logout</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
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
        { loggedIn ? 
          <>
            <div className='search-border'>
              <Input.Search 
                placeholder='Search...' 
                onSearch={(v, e) => console.log(v, e)}
                id='search'
              />
            </div>
            <div className='header-avatar'>
              <Dropdown 
                overlay={menu} 
                trigger={['click']} 
                visible={toggle} 
                onClick={handleToggle}
              >
                <Avatar user={user} />
              </Dropdown>
            </div>
          </>
          : null
        }
      {/* </div> */}
    </div>
  )
}

export default Header