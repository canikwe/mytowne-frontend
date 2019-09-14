import React from 'react'
import Feature from '../components/Feature'

const Home = ({ user }) => {
    return(
        <div id='home-layout'>
            <Feature user={ user } />
            <div className='home-card'>Home Page Connected!</div>
            <div className='home-card'>Home Page Connected!</div>
            <div className='top-posts'>Top Posts Go Here</div>
            {/* Use A GRID */}
        </div>
    )
}

export default Home