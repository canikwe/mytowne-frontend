import React, { Component } from 'react'
import CardContainer from './CardContainer'
import Fetch from '../helper/Fetch'
import { Link, Redirect } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Modal } from 'antd'
// import { withRouter } from 'react-router'
import Loading from './Loading'
import '../styles/Profile.css'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      posts: [],
      redirect: false
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

      if (data.user) {
        this.setState({
          user: data.user,
          posts: data.posts
        })
      } else {
        Modal.error({
          title: 'Something went wrong',
          content: 'That user cannot be found!',
        })
        this.setState({ redirect: true })
      }
    })
    .catch(err => {
      console.log(err)

      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
      this.setState({ redirect: true })
    })
  }

  
  render() {
    const { removeLike, addLike, currentUser } = this.props
    const { user, posts } = this.state
    // console.log('user is: ', user)
    // console.log('posts are: ', posts)
    // console.log(this.props)

    if (!isEmpty(user)) {
     return (
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
    } else if (this.state.redirect) {
      return <Redirect to='/home' />

    } else {
    return <Loading />
    }
  }
}

// export default withRouter(Profile)
export default Profile