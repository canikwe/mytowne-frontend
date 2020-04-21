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
      editing: false,
    }
  }

  componentDidMount = () => {
      this.getUser()
  }

  componentDidUpdate = () => {
    if (this.props.id !== this.state.user.id && !this.state.loading) {
      console.log('Fetching new user!')
      this.getUser()
    }
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

  updateEditing = () => this.setState({ editing: !this.state.editing })

  render() {
    const { user, likedPosts, defaultPosts, editing } = this.state
    const { posts: authoredPosts, handleTagClick, editable } = this.props
    const displayedPosts = defaultPosts ? authoredPosts : likedPosts

    if (this.state.redirect) {
      return <Redirect to='/home' />
    } 
    return (
      <div className='profile-container'>
        <ProfileCard 
          user={user} 
          posts={authoredPosts} 
          likedPosts={likedPosts}
          editable={editable}
          handleEdit={this.updateEditing}
          editing={editing}
        />

        <div className='post-nav'>
          <Tabs defaultActiveKey='1' onChange={this.toggleDisplayedPosts} >
            <Tabs.TabPane tab='Posts' key='1'></Tabs.TabPane>
            <Tabs.TabPane tab='Likes' disabled={!likedPosts.length} key='2'></Tabs.TabPane>
          </Tabs>
        </div>

        { displayedPosts.map((p, i) => <PostTile key={p.id} post={p} handleTagClick={handleTagClick} delay={i + 1}/> )}

      </div>
    )
  }
}

export default Profile