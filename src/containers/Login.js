import React, { PureComponent } from 'react'
import { Icon, Button} from 'antd'
import '../styles/Login.css'


class Login extends PureComponent {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  localLoginHandler = e => {
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
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <p />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <p />
              <Button 
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
                onClick={this.localLoginHandler}
              >
                Log in
              </Button>
              <button
                type="submit"
                onClick={this.localLoginHandler}
              >
                Log In:
              </button>
            </form>

          </div>
        </div>
      </main>
    )
  }
}



export default Login
