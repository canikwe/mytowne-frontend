import React, { Component } from 'react'
import Feature from '../components/Feature'
import TopPosts from '../components/TopPosts'
import HomeCard from '../components/HomeCard'
import { Button } from 'antd'

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
            <div id='home-layout'>
                <Feature user={ user } />
                {this.showFollowedPosts().map(p => <HomeCard key={p.id} post={p}/>)}
                <Button onClick={ this.showMorePosts } type="primary">More Posts</Button>
                <TopPosts posts={posts}/>
            </div>
        )
    }
}

export default Home