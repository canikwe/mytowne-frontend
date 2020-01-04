import React from 'react'

const HomeCard = ({ post }) => {
    return (
        <div className='home-card'>
            <p>{ post.title }</p>
        </div>
    )
}

export default HomeCard