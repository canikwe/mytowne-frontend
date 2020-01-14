import React, { Component } from 'react'
import CardContainer from './CardContainer'
import Fetch from '../helper/Fetch'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
// import { withRouter } from 'react-router'
import Loading from './Loading'
import '../styles/Profile.css'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      posts: []
    }
  }

  componentDidMount = () => {
    this.getUser()
  }

  // componentDidUpdate = () => {
  //   const userId = parseInt(this.props.match.params.id)
  //   // Updates the current user if the component is unable to unmount (e.g. selecting the current user's profile from the NavBar menu while viewing a different user's profile.)
  //   if (userId !== this.state.user.id) this.getUser()
  // }

  getUser = () => {
    // const userId = parseInt(this.props.match.params.id)
    const userId = this.props.id

    Fetch.GET(`users/${userId}`)
    .then(data => {
      this.setState({
        user: data.user,
        posts: data.posts})
    })
  }

  
  render() {
    const { removeLike, addLike, currentUser } = this.props
    const { user, posts } = this.state
    console.log('user is: ', user)
    console.log('posts are: ', posts)
    console.log(this.props)

    return !isEmpty(user) ?
     (
      <div id='profile-container'>
        <div className='profile-header'>
          <div className='profile-img-container'>
            {
              user.avatar !== "" ?
                <img src={user.avatar} alt="user avatar" className='profile-img'/> 
              : null
            }
          </div>

          <div className='profile-contents'>
            <h2>{user.name}&nbsp;</h2>
            <p>{user.bio}</p>
          </div>
        </div>
            
            {
              user.id === currentUser.id ?
              <div>
          <Link to={'/'} color="primary" >
            Back
          </Link>
          <Link to={`/profile/edit`} >
            Edit
          </Link>
        </div>
        : null
            }

        <div>
          {
            posts ? (
              <CardContainer posts={posts} name={user.name} addLike={addLike} removeLike={removeLike} user={user}/>
            ) 
            : null
          }
        </div>
      </div>
    )
    : <Loading />

  }
}

// export default withRouter(Profile)
export default Profile