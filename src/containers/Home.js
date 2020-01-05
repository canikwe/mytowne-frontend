import React, { Component } from 'react'
import Feature from '../components/Feature'
import TopPosts from '../components/TopPosts'
import HomeCard from '../components/HomeCard'
import { Button, Row, Col } from 'antd'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            index: 0
        }
    }

    showMorePosts = () => {
        if (this.state.index + 5 > this.props.followedPosts.length) {
            this.setState({ index: 0 })
        } else {
            this.setState({ index: this.state.index +  5 })
        }
    }

    showFollowedPosts = () => {
        return this.props.followedPosts.slice(this.state.index, this.state.index + 5)
    }
    
    render(){
        const { user, posts, followedPosts } = this.props
        console.log(followedPosts)
        return(
            <>
            <Row gutter={[8, 16]}>
                    <Col span={24}>
                        <Feature user={ user } />
                    </Col>
                </Row>
            {/* <div id='home-layout'> */}
            <Row gutter={[8, 16]} type="flex" justify="space-around" align="top">
                <Col span={12}>
                    {this.showFollowedPosts().map(p => <HomeCard key={p.id} post={p}/>)}
                </Col>
                <Col span={8}>
                    <TopPosts posts={posts}/>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={1}>
                    <Button onClick={ this.showMorePosts } type="primary">More Posts</Button>
                </Col>
            </Row>
            {/* </div> */}
            </>
        )
    }
}

export default Home