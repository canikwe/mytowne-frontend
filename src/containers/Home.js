import React, { PureComponent } from 'react'
import QuickPost from '../components/QuickPost'
import PostFeed from '../containers/PostFeed'
import Weather from '../components/Weather'
import HomeFilters from '../components/HomeFilters'
import { message, Button, Row, Col } from 'antd'
import SideBar from '../components/SideBar'

class Home extends PureComponent {
  constructor(){
    super()
    this.state = {
      index: 0,
      content: ''
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
    const { user, loading, handleTabChange, handleSubmit } = this.props
    return (
      <>
        <Row type="flex" justify="space-around" align="top">
          <Col span={ 5 }>
            <SideBar />
          </Col>
          <Col span={ 10 }>
            <QuickPost user={user} submitPost={this.submitPost} content={this.state.content} handleContentChange={this.handleContentChange}/>
            <HomeFilters handleTabChange={handleTabChange}/>
            <PostFeed posts={this.paginatedPosts()} loading={loading}/>
            <Button onClick={ this.showMorePosts } type="primary">More Posts</Button>
          </Col>
            <Col span={ 5 }>
              <Weather />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={1}>
          </Col>
        </Row>
      </>
    )
  }
}

export default Home