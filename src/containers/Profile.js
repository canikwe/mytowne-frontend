import React, { PureComponent } from 'react'
import Fetch from '../helper/Fetch'
import { Redirect } from 'react-router-dom'
import { Modal, Tabs } from 'antd'
import ProfileCard from '../components/ProfileCard'
import PostTile from '../components/PostTile'
import '../styles/Profile.css'
// import PostFeed from '../containers/PostFeed'

class Profile extends PureComponent {
  constructor(){
    super()
    this.state = {
      user: {},
      likedPosts: [],
      redirect: false,
      loading: true,
      defaultPosts: true,
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

  toggleDisplayedPosts = () => this.setState({ defaultPosts: !this.state.defaultPosts})

  render() {
    const { user, likedPosts, defaultPosts } = this.state
    const { posts: authoredPosts, handleTagClick } = this.props
    const displayedPosts = defaultPosts ? authoredPosts : likedPosts

    if (this.state.redirect) {
      return <Redirect to='/home' />
    } 
    return (
      <div className='profile-container'>
        <ProfileCard user={user} posts={authoredPosts} likedPosts={likedPosts}/>

        <div className='post-nav'>
          <Tabs defaultActiveKey='1' onChange={this.toggleDisplayedPosts} >
            <Tabs.TabPane tab='Posts' key='1'></Tabs.TabPane>
            <Tabs.TabPane tab='Likes' disabled={!likedPosts.length} key='2'></Tabs.TabPane>
          </Tabs>
        </div>

        { displayedPosts.map(p => <PostTile key={p.id} post={p} handleTagClick={handleTagClick} /> )}

      </div>
    )
  }
}

export default Profile