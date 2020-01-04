import React from 'react'
import Feature from '../components/Feature'
import TopPosts from '../components/TopPosts'
import HomeCard from '../components/HomeCard'

const Home = ({ user, posts, followedPosts }) => {
    console.log(followedPosts)
    return(
        <div id='home-layout'>
            <Feature user={ user } />
            {followedPosts.map(p => <HomeCard key={p.id} post={p}/>)}
            <TopPosts posts={posts}/>
        </div>
    )
}

export default Home