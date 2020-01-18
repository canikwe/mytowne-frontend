import React from 'react'
import { Menu, Icon, Avatar, Button, Affix, Col, Drawer } from 'antd'
import { Redirect, Link } from 'react-router-dom'

const SideBar = ({ user, loading, handleLogout, toggleCollapsed, collapsed }) => {

  const handleClick = value => {
    console.log('click ', value)
  }

  return (
    <Col span={ 1 }>

    {/* Button to open and close the drawer */}
      <Affix>
        <Button
          type='link'
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          <Icon
            type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
      </Affix>

      <Drawer
        title={
          <span>
            <Icon type="compass" />
            <span>Navigation</span>
          </span>
        }
        placement='left'
        closable={false}
        visible={ collapsed }
        onClose={toggleCollapsed}
      >
        <Menu
          onClick={handleClick}
          // style={{ width: 256 }}
          defaultSelectedKeys={['home']}
          defaultOpenKeys={['nav', 'index', 'new']}
          mode="inline"
          inlineCollapsed={false}
        >
          <Menu.Item
            key="Menu"
          >
            <div onClick={toggleCollapsed}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
              <span>Menu</span>
            </div>
          </Menu.Item>
          {/* <Menu.SubMenu
            key="nav"
            title={
              <span>
                <Icon type="compass" />
                <span>Navigation</span>
              </span>
            }
          > */}
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
          {/* </Menu.SubMenu> */}
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
      </Drawer>
    </Col>
  )
}

export default SideBar