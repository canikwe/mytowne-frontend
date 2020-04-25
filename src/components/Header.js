import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {  Dropdown, Menu, Icon } from 'antd'
import Avatar from './Avatar'
import '../styles/NavBar.css'

class Header extends PureComponent {
  constructor() {
    super()
    this.state = {
      search: false
    }
  }

  handleToggle = () => this.setState({ search: !this.state.search })

  submitSearch = term => {
    this.handleToggle()
    this.props.handleSearch(term)
    this.props.history.push('/posts')
  }

  
  menu = () => (
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
        <span onClick={this.props.handleLogout}>Logout</span>
      </Menu.Item>
    </Menu>
  )
  
  render() {
    const  { user } = this.props
  
    return (
      <div id='header'>
        <div className='item1'>
          <Link to='/home'>
            <h1 id='header-title'>myTowne</h1>
          </Link>
        </div>

        <div className='header-avatar'>
          <Link to={`/profile/${user.id}`}>
            <Avatar user={user} />
          </Link>
        </div>
        <div className='header-menu'>
          <Dropdown 
            overlay={this.menu()} 
            trigger={['click']} 
          >
            <Icon type='more' />
          </Dropdown>
        </div>

      </div>
    )
  }
}

export default withRouter(Header)