import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {  Dropdown, Menu, Icon, Input } from 'antd'
import NavMenu from '../components/NavMenu'
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

            {/* <> */}
              <div className='search'>
                {
                  this.state.search ? 
                    <Input.Search 
                      placeholder='Search...' 
                      onSearch={this.submitSearch}
                      onBlur={this.handleToggle}
                      id='search'
                    />
                      :
                    <div id='header-search-icon'>
                      <Icon type='search' onClick={this.handleToggle}/>
                    </div>
                }
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
            {/* </> */}

        {/* </div> */}
      </div>
    )
  }
}

export default withRouter(Header)