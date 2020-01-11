import React, { PureComponent } from 'react'
// import Feature from '../components/Feature'
import QuickPost from '../components/QuickPost'
// import TopPosts from '../components/TopPosts'
import PostFeed from '../containers/PostFeed'
import Weather from '../components/Weather'
// import HomeCard from '../components/HomeCard'
import HomeFilters from '../components/HomeFilters'
import { Button, Row, Col } from 'antd'
import SideBar from '../components/SideBar'

class Home extends PureComponent {
  constructor(){
    super()
    this.state = {
      index: 0
    }
  }

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
    
  render(){
    const { loading, handleTabChange } = this.props
    return (
      <>
        <Row type="flex" justify="space-around" align="top">
          <Col span={ 5 }>
            <SideBar />
          </Col>
          <Col span={ 10 }>
            <QuickPost />
            <HomeFilters handleTabChange={handleTabChange}/>
            <PostFeed posts={this.paginatedPosts()} loading={loading}/>
          </Col>
            <Col span={ 5 }>
              <Weather />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={1}>
            <Button onClick={ this.showMorePosts } type="primary">More Posts</Button>
          </Col>
        </Row>
      </>
    )
  }
}

export default Home