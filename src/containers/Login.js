import React, { PureComponent } from 'react'
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
      <main>
        <div className='login-div'>
          <h3>Login</h3><br />
          <form className='login-form'>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              /><br />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              /><br />
            <button
              type="submit"
              onClick={this.localLoginHandler}
            >
              Log In:
            </button>
          </form>
        </div>
      </main>
    )
  }
}



export default Login
