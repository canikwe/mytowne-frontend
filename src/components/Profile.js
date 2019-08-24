import React, { Component } from 'react'
import CardContainer from './CardContainer'
import Fetch from '../helper/Fetch'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { withRouter } from "react-router"

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount = () => {
    this.getUser()
  }

  componentDidUpdate = () => {
    const userId = parseInt(this.props.match.params.id)
    // Updates the current user if the component is unable to unmount (e.g. selecting the current user's profile from the NavBar menu while viewing a different user's profile.)
    if (userId !== this.state.user.id) this.getUser()
  }

  getUser = () => {
    const userId = parseInt(this.props.match.params.id)

    Fetch.GET(`users/${userId}`)
    .then(data => {
      this.setState({
        user: data.user,
        posts: data.posts})
    })
  }

  
  render() {
    const { removeLike, addLike } = this.props
    const { user, posts } = this.state
    console.log('user is: ', user)
    console.log('posts are: ', posts)

    return !isEmpty(user) ?
     (
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
            posts ? (
              <CardContainer posts={posts} name={user.name} addLike={addLike} removeLike={removeLike} user={user}/>
            ) 
            : null
          }
          <Link to={'/'} color="primary" >
            Back
          </Link>
          <Link to={`/profile/edit`} >
            Edit
          </Link>
        </div>
      </React.Fragment >
    )
    : <h1>Loading ... </h1>

  }
}

const ProfileWithRouter = withRouter(Profile)
export default ProfileWithRouter
