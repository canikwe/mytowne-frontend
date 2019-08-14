import React, { PureComponent, Fragment } from 'react'

class EditProfile extends PureComponent {
  constructor() {
    super()
    this.state = {
      open: true,
      name: '',
      birth_date: '',
      email: '',
      username: '',
      town: '',
      avatar: '',
      bio: ''
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    if (this.props.user.name !== this.state.name) {
      const { name, birth_date, email, username, town, avatar, bio } = this.props.user
      this.setState({ 
        name, birth_date, email, username, town, avatar, bio 
      })
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
    return(
      <Fragment>
        <p>Name: </p>
        <input type='text' name='name' value={this.state.name} onChange={this.handleChange} disabled />
        <p>Birthday: </p>
        <input type='date' name='birth_date' value={this.state.birth_date} onChange={this.handleChange} />
        <p>Email: </p>
        <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
        <p>Username: </p>
        <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
        <p>Town: </p>
        <input type='text' name='town' value={this.state.town} onChange={this.handleChange} disabled />
        <p>Avatar URL: </p>
        <input type='text' name='avatar' value={this.state.avatar} onChange={this.handleChange} />  
        <p>Bio: </p>
        <input type='text' name='bio' value={this.state.bio} onChange={this.handleChange} />
        <button onClick={this.handleSave}>Save Changess</button>        
      </Fragment >
    )
  }
}

export default EditProfile
