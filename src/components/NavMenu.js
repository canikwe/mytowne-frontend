import React from 'react'
import { Menu, Icon, Affix } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import ProfileCard from '../components/ProfileCard'

const SideBar = ({ user, loading, handleLogout, toggleCollapsed, collapsed }) => {

  const handleClick = value => {
    console.log('click ', value)
  }

  return (
    <div id='nav-menu'>

      <Affix>
        {collapsed  ?
          <ProfileCard />
          : null
        }
        <Menu
          onClick={handleClick}
          // style={{ width: 256 }}
          defaultSelectedKeys={['home']}
          defaultOpenKeys={['nav', 'index', 'new']}
          mode="inline"
          inlineCollapsed={false}
        >
          <Menu.Item key='home'>
            <Link to='/home'>
              <Icon type='home' /> Home
            </Link>
          </Menu.Item>
          <Menu.Item key="new-post">
            <Link to='/posts/new'>
              <Icon type='form' /> New Post
            </Link>
          </Menu.Item>
          <Menu.Item key="index">
            <Link to='/index'>
              <Icon type='team' />Community Board
            </Link>
          </Menu.Item>
          <Menu.Item key='events'>
            <Icon type='calendar' />Events
          </Menu.Item>
        </Menu>
      </Affix>
    </div>
  )
}

export default withRouter(SideBar)

/*
         <Menu.Item key='logout'>
              <Icon type='logout' /> <span onClick={handleLogout}>Logout</span>
            </Menu.Item>
*/