import React, { PureComponent } from 'react'
import { message, Button } from 'antd'
// import QuickPost from '../components/QuickPost'
// import HomeFilters from '../components/HomeFilters'
import PostFeed from '../containers/PostFeed'
import SideBar from '../components/SideBar'
import PostCard from '../components/PostCard'
import FeaturePost from '../components/FeaturePost'

class Home extends PureComponent {
  constructor(){
    super()
    this.state = {
      index: 0,
      content: '',
    }
  }

// --------------- newsfeed helper methods ---------------
  showMorePosts = () => {
    if (this.state.index + 5 > this.props.posts.length) {
      this.setState({ index: 0 })
    } else {
      this.setState({ index: this.state.index +  5 })
    }
    document.querySelector('.ant-tabs-tab').scrollIntoView()
  }

  paginatedPosts = () => {
    return this.props.posts.slice(this.state.index, this.state.index + 5)
  }

// --------------- quick post helper methods ---------------
  submitPost = e => {
    e.preventDefault()
    const data = {
      post: {
        post_info: {
          user_id: this.props.user.id,
          title: 'Untitled',
          content: this.state.content
        }

      }
    }

    this.props.handleSubmit(data)
    this.setState({ content: '' })
    message.success('Post created 🎉!')
  }

  handleContentChange = e => {
    this.setState({ content: e.target.value })
  }


// --------------- main render ---------------
    
  render(){
    const { user, loading, handleTabChange, posts } = this.props
    const { content } = this.state
    console.log(posts[0])
    return (
      <div id='home'>
        <FeaturePost loading={loading} post={posts[0]} className='' />
        <SideBar />
        <PostFeed 
          posts={posts} 
          loading={loading}
        />
      </div>
    )
  }
}

export default Home

/*
  <QuickPost
    user={user}
    submitPost={this.submitPost}
    content={content}
    handleContentChange={this.handleContentChange}
  />
  <HomeFilters
    handleTabChange={handleTabChange}
  />
  <Button
    onClick={ this.showMorePosts }
    type="primary"
  >
    More Posts
  </Button>
*/