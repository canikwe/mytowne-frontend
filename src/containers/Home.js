import React, { PureComponent } from 'react'
// import Feature from '../components/Feature'
import QuickPost from '../components/QuickPost'
import TopPosts from '../components/TopPosts'
import HomeCard from '../components/HomeCard'
import HomeFilters from '../components/HomeFilters'
import { Button, Row, Col, Tabs } from 'antd'
import SideBar from '../components/SideBar'

class Home extends PureComponent {
    constructor(){
        super()
        this.state = {
            index: 0
        }
    }

    showMorePosts = () => {
        if (this.state.index + 5 > this.props.dashboardPosts.length) {
            this.setState({ index: 0 })
        } else {
            this.setState({ index: this.state.index +  5 })
        }
        document.querySelector('.ant-tabs-tab').scrollIntoView()
    }

    showFollowedPosts = () => {
        return this.props.dashboardPosts.slice(this.state.index, this.state.index + 5)
    }
    
    render(){
        const { user, posts, dashboardPosts, loading, handleTabChange } = this.props
        console.log(dashboardPosts)
        return (
            <>

                <Row type="flex" justify="space-around" align="top">
                    <Col span={ 5 }>
                        <SideBar />
                    </Col>
                    <Col span={ 10 }>

                        <QuickPost />
                        <HomeFilters handleTabChange={handleTabChange}/>

                        {this.showFollowedPosts().map(p => <HomeCard key={p.id} post={p} loading={ loading }/>)}
                    </Col>
                    <Col span={ 5 }>
                        <TopPosts posts={posts}/>
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