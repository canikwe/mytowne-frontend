import React, { PureComponent } from 'react'
import { message, Button, Row, Col, Icon } from 'antd'

// import SideBar from '../components/SideBar'
import QuickPost from '../components/QuickPost'
import HomeFilters from '../components/HomeFilters'
import PostFeed from '../containers/PostFeed'
import Weather from '../components/Weather'
import ChatBox from '../components/ChatBox'


class Home extends PureComponent {
  constructor(){
    super()
    this.state = {
      index: 0,
      content: '',
      collapsed: false
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
    const { user, loading, handleTabChange, handleLogout } = this.props
    const { content, collapsed } = this.state
    return (
      <>
        <Row type="flex" justify="space-around" align="top">
          {/* <Col span={ collapsed ? 2 : 5 }>

            <SideBar user={user} loading={loading} handleLogout={handleLogout} toggleCollapsed={this.toggleCollapsed} collapsed={this.state.collapsed}/>
          </Col>  */}
          {/* <Col span={ collapsed ? 13 : 10 }> */}

          <Col span={ 15 }>
            <QuickPost user={user} submitPost={this.submitPost} content={content} handleContentChange={this.handleContentChange}/>
            <HomeFilters handleTabChange={handleTabChange}/>
            <PostFeed posts={this.paginatedPosts()} loading={loading}/>
            <Button onClick={ this.showMorePosts } type="primary">More Posts</Button>
          </Col>
          <Col span={ 5 }>
            <Row gutter={[8, 40]}>
              <Col>
                <Weather />
              </Col>
            </Row>
            <Row gutter={[8, 40]}>
              <Col>
                <ChatBox />
              </Col>
            </Row>
          </Col>
         </Row>
      </>
    )
  }
}

export default Home