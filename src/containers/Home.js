import React from 'react'
import Feature from '../components/Feature'

const Home = ({ user }) => {
    return(
        <div>
            <Feature user={ user } />
            <h2>Home Page Connected</h2>
        </div>
    )
}

export default Home