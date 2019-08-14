import React, { PureComponent } from 'react';
import CardContainer from '../components/CardContainer'
import { Link } from 'react-router-dom'

class Profile extends PureComponent {
  state = { open: true }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { user, userPosts } = this.props

    return (
      <React.Fragment>
        {
          user.avatar !== "" ?
            <img src={user.avatar} alt="user avatar"/> 
          : null
        }
        <h2>{user.name}&nbsp;</h2>
        <p>{user.bio}</p>

        <div>
          {
            user.posts ? (
              <CardContainer posts={ userPosts } name={ user.name } avatar={ user.avatar } />
            ) 
            : null
          }
          <Link to={'/'} onClick={this.handleClose} color="primary" >
            Back
          </Link>
          <Link to={`/profile/edit`} onClick={this.handleClose} >
            Edit
          </Link>
        </div>
      </React.Fragment >
    )
  }
}

export default Profile
