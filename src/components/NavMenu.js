import React from 'react'
import { Menu, Icon, Affix } from 'antd'
import { Link, withRouter } from 'react-router-dom'

const NavMenu = (props) => {
  const { user, loading } = props

  const handleClick = value => {
    console.log('click ', value)
  }

  const activeKey = () => props.location.pathname.replace('/', '')

  return (

        <ul>
          <li>
            <Link to='/index'>
              <Icon type='team' />Community Board
            </Link>
          </li>
          <li>
            <Link to='/posts/new'>
              <Icon type='form' /> New Post
            </Link>

          </li>
          <li>
            <Icon type='calendar' />Events

          </li>
        </ul>
    // </div>
  )
}

export default withRouter(NavMenu)

/*
         <Menu.Item key='logout'>
              <Icon type='logout' /> <span onClick={handleLogout}>Logout</span>
            </Menu.Item>
*/