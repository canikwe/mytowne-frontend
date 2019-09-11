import React, { PureComponent } from 'react'

class EditProfile extends PureComponent {
  constructor(props) {
    super(props)
    const { name, birth_date, email, username, avatar, bio } = props.user

    this.state = {
      name, birth_date, email, username, avatar, bio
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave = () => {
    this.props.editUser(this.state, this.props.user.id)
  }

  render() {
    const { name,username, email, birth_date, avatar, bio } = this.state
    return(
      <div id='profile-form-container'>
        <h1>
          Edit Profile
        </h1>
        <div id='profile-form'>
          <div className='profile-col'>

            <div className='input-label'>
              <label htmlFor='name'>Name: </label>
            </div>
            <div className='input'>
              <input type='text' name='name' value={ name } onChange={this.handleChange} disabled />
            </div>
            <p />
            <div className='input-label'>
              <label htmlFor='username'>Username: </label>
            </div>
            <div className='input'>
              <input type='text' name='username' value={ username } onChange={this.handleChange} />
            </div>
            <p />

            <div className='input-label'>
              <label htmlFor='email'>Email: </label>
            </div>
            <div className='input'>
              <input type='text' name='email' value={ email } onChange={this.handleChange} />
            </div>

            <p />
          {/* <label htmlFor='town'>Town: </label>
          <input type='text' name='town' value={this.state.town} onChange={this.handleChange} disabled /> */}

            <div className='input-label'>
              <label htmlFor='birthday'>Birthday: </label>
            </div>
            <div className='input'>
              <input type='date' name='birth_date' value={ birth_date } onChange={this.handleChange} />
            </div>
            <p />

            <div className='input-label'>
            <label htmlFor='avatar'>Avatar URL: </label>
            </div>
            <div className='input'>
              <input type='text' name='avatar' value={ avatar } onChange={this.handleChange} />
            </div>
            <p />

            <div className='input-label'>
              <label htmlFor='bio'>Bio: </label>
            </div>
            <div className='input'>
              <textarea name='bio' value={ bio } onChange={this.handleChange} rows='8' cols='50' />
            </div>
            
          </div>
        </div>

        <button className='btn' onClick={this.handleSave}>Save Changes</button>        
      </div >

    )
  }
}

export default EditProfile
