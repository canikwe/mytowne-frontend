import React, { Component } from 'react'
import Fetch from '../helper/Fetch'
import { Redirect } from 'react-router-dom'
import { Modal } from 'antd'
import ProfileCard from '../components/ProfileCard'
import '../styles/Profile.css'
import PostFeed from '../containers/PostFeed'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      posts: [],
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
          posts: data.posts,
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
    const { user, posts, loading } = this.state

    if (this.state.redirect) {
      return <Redirect to='/home' />
    } 
    return (
      <>
        <ProfileCard loading={loading} user={user} />
        <PostFeed loading={loading} posts={posts} />
      </>
    )
  }
}

export default Profile