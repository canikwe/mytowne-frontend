import React from 'react'

const Likes = ({ icon, favorite, likesCount, likePost }) => {
    return(
        <div className='likes-container'>
            <i className={ icon } onClick={ likePost }>{ favorite } </i>
            <p>{ likesCount } Likes</p>
        </div>
    )
}

export default Likes