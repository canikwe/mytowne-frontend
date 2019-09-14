import React from 'react'
import Feature from '../components/Feature'

const Home = ({ user }) => {
    return(
        <div>
            <Feature user={ user } />
            <h2>Home Page Connected</h2>
            {/* Use A GRID */}
        </div>
    )
}

export default Home