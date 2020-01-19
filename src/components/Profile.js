import React, { Component } from 'react'
import Fetch from '../helper/Fetch'
import { Redirect } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Modal, Row, Col } from 'antd'
import ProfileCard from '../components/ProfileCard'
import Loading from './Loading'
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
    // const { removeLike, addLike, currentUser } = this.props
    const { user, posts, loading } = this.state
    // console.log('user is: ', user)
    // console.log('posts are: ', posts)
    console.log(this.props)

    if (!isEmpty(user)) {
      return (
        <Row type='flex' justify='center'>
          <Col span={12} >
            <ProfileCard user={user}/>
            <PostFeed posts={posts} loading={loading} />
          </Col>
        </Row>
      )
    } else if (this.state.redirect) {
      return <Redirect to='/home' />
    } else {
      return <Loading />
    }
  }
}

export default Profile