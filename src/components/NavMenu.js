import React from 'react'
import { Menu, Input } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import {
  TeamOutlined,
  FormOutlined
} from '@ant-design/icons'

const NavMenu = ({handleSearch, history}) => {
  // const { user, loading } = props
  const submitSearch = term => {
    handleSearch(term)
    history.push('/posts')
  }

  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="inline" style={{minHeight: '100vh'}}>
        <Menu.Item title='Welcome' key="1" style={{height: '50px', textAlign: 'center', marginTop: '10px', backgroundColor: 'transparent'}}>
          <Link to='/home'>
            <img src={require('../helper/cityscape.svg')} alt='home' id='header-logo' />
          </Link>
        </Menu.Item>
        <Menu.Item title='Welcome' key="2" style={{backgroundColor: 'transparent'}}>
          <Input.Search
            placeholder='Search...'
            onSearch={submitSearch}
            id='search'
          />
        </Menu.Item>
        <Menu.Item key="3">
          <Link to='/posts'>
            <TeamOutlined />
            <span className="nav-text">Community Board</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to='/posts/new'>
            <FormOutlined />
            <span className="nav-text">New Post</span>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default withRouter(NavMenu)