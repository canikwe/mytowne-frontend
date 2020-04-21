import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

const NavMenu = () => {
  // const { user, loading } = props

  return (
    <ul>
      <li>
        <Link to='/posts'>
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
  )
}

export default NavMenu