import React from 'react'
import { Menu, Icon, Avatar } from 'antd'
import { Redirect, Link } from 'react-router-dom'

const SideBar = ({ user, loading, handleLogout }) => {
  const handleClick = value => {
    console.log('click ', value)
  }

  return (
    <Menu
      onClick={handleClick}
      // style={{ width: 256 }}
      defaultSelectedKeys={['home']}
      defaultOpenKeys={['nav', 'index', 'new']}
      mode="inline"
    >
      <Menu.Item
        key="title"
      >
        <Avatar style={{marginRight: '5px'}}/>
        <span>{loading ? '.....' : `Welcome, ${user.name}!`}</span>
      </Menu.Item>
      <Menu.SubMenu
        key="nav"
        title={
          <span>
            <Icon type="compass" />
            <span>Navigation</span>
          </span>
        }
      >
        <Menu.Item key='home'>
          <Link to='/home'>
            <Icon type='home' /> Home
          </Link>
        </Menu.Item>
        <Menu.Item key="index"><Icon type='team' />Community</Menu.Item>
        <Menu.Item key='events'><Icon type='calendar' />Events</Menu.Item>
        <Menu.SubMenu key="new" title={<><Icon type='plus' /><span>Create</span></>}>
          <Menu.Item key="posts/new">
            <Icon type='form' />New Post
          </Menu.Item>
          <Menu.Item key="new-event"><Icon type='carry-out' />New Event</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="settings"
        title={
          <span>
            <Icon type="setting" />
            <span>Settings</span>
          </span>
        }
      >
        <Menu.Item key="9">Edit Profile</Menu.Item>
        <Menu.Item key="10">Account</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key='logout'>
          <Icon type='logout' /> <span onClick={handleLogout}>Logout</span>
      </Menu.Item>
    </Menu>
  )
}

export default SideBar