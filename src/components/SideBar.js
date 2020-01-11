import React from 'react'
import { Menu, Icon, Button, Avatar } from 'antd'

const SideBar = () => {
  return (
    <Menu
      onClick={null}
      // style={{ width: 256 }}
      defaultSelectedKeys={['home']}
      defaultOpenKeys={['nav', 'comm', 'new']}
      mode="inline"
    >
      <Menu.Item
        key="title"
      >
        <Avatar />
        <span>Username Here</span>
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
        <Menu.Item key='home'><Icon type='home' /> Home</Menu.Item>
        <Menu.Item key="comm"><Icon type='team' />Community</Menu.Item>
        <Menu.Item key='events'><Icon type='calendar' />Events</Menu.Item>
        <Menu.SubMenu key="new" title={<><Icon type='plus' /><span>Create</span></>}>
          <Menu.Item key="new-post"><Icon type='form' />New Post</Menu.Item>
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
    </Menu>
  )
}

export default SideBar