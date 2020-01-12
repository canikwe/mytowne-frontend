import React, { PureComponent } from 'react'
import { Icon, Button, Input } from 'antd'
import '../styles/Login.css'

class Login extends PureComponent {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  submitLoginInfo = e => {
    e.preventDefault()
    this.props.handleLogin({
      user: {
        username: this.state.username, password: this.state.password
      }
    })
  }

  render() {
    return (
      <main id='login'>
        <div className='login-div'>
          <div className='login-header'>
            <Icon type="login" style={{ color: 'red', fontSize: '2em' }} />
            <h1>Log In</h1>
          </div>
          <div className='login-contents'>
            <form className='login-form'>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                name='username'
              />
              <p />
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <p />
              <Button 
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
                onClick={this.submitLoginInfo}
                style={{
                  width: '100%',
                  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                }}
              >
                Log In
              </Button>
            </form>
          </div>
        </div>
      </main>
    )
  }
}



export default Login
