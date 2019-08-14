import React, { PureComponent } from 'react'
import '../styles/Login.css'


class Login extends PureComponent {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { handleLogin } = this.props

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
              onClick={(e) => {
                e.preventDefault()
                handleLogin({user: {
                  username: this.state.username, password: this.state.password
                }
                }
                )}
              }
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
