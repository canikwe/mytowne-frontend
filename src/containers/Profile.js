import React, { PureComponent } from 'react'
import Fetch from '../helper/Fetch'
import { Redirect } from 'react-router-dom'
import { Modal } from 'antd'
import ProfileCard from '../components/ProfileCard'
import '../styles/Profile.css'
import PostFeed from '../containers/PostFeed'

class Profile extends PureComponent {
  constructor(){
    super()
    this.state = {
      user: {},
      likedPosts: [],
      redirect: false,
      loading: true
    }
  }

  componentDidMount = () => {
    this.getUser()
  }

  getUser = () => {
    const userId = this.props.id

    Fetch.GET(`users/${userId}`)
    .then(data => {
      if (data.user) {
        this.setState({
          user: data.user,
          likedPosts: data.liked_posts,
          loading: false
        })
      } else {
        Modal.error({
          title: 'Something went wrong',
          content: 'That user cannot be found!',
        })
        this.setState({ redirect: true, loading: false })
      }
    })
    .catch(err => {
      console.log(err)

      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
      this.setState({ redirect: true, loading: false })
    })
  }

  
  render() {
    const { user, loading, likedPosts } = this.state
    const { posts } = this.props

    if (this.state.redirect) {
      return <Redirect to='/home' />
    } 
    return (
      <div className='profile-container'>
        <ProfileCard user={user} posts={posts} likedPosts={likedPosts}/>
        <div className='segment post-nav'>
          Posts | Likes
        </div>
        {posts.map(p => (
          <div key={p.id} className='segment profile-post'>{p.title}</div>
          )
        )}
        {/* <ProfileCard loading={loading} user={user} /> */}
        {/* <PostFeed loading={loading} posts={posts} /> */}
      </div>
    )
  }
}

export default Profile