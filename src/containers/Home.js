import React from 'react'
import Feature from '../components/Feature'
import TopPosts from '../components/TopPosts'
import HomeCard from '../components/HomeCard'

const Home = ({ user, posts }) => {

    return(
        <div id='home-layout'>
            <Feature user={ user } />
            <HomeCard />
            <HomeCard />
            <TopPosts posts={posts}/>
        </div>
    )
}

export default Home