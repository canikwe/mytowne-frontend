import React from 'react'

const Likes = ({ icon, like, likesCount, likePost }) => {
    return(
        <div className='likes-container'>
            <i className={ icon } onClick={ likePost }>{ like } </i>
            <p>{ likesCount } Likes</p>
        </div>
    )
}

export default Likes