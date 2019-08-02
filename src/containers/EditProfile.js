import React, { PureComponent, Fragment } from 'react'

class EditProfile extends PureComponent {
  constructor(props) {
    super(props)

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

  // componentDidUpdate(prevProps) {
  //   if (this.props.user.name !== this.state.name) {
  //     this.setState({
  //       name: this.props.user.name,
  //       birth_date: this.props.user.birth_date,
  //       email: this.props.user.email,
  //       username: this.props.user.username,
  //       town: this.props.user.town,
  //       avatar: this.props.user.avatar,
  //       bio: this.props.user.bio
  //     })
  //   }
  // }

  componentDidMount(prevProps) {
    if (this.props.user.name !== this.state.name) {
      this.setState({
        name: this.props.user.name,
        birth_date: this.props.user.birth_date,
        email: this.props.user.email,
        username: this.props.user.username,
        town: this.props.user.town,
        avatar: this.props.user.avatar,
        bio: this.props.user.bio
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
