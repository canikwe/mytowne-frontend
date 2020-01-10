import React from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Card, Icon, Avatar } from 'antd'
import moment from 'moment'

const HomeCard = ({ post, loading }) => {
    console.log(post)

    const postDate = () => {
        const date = moment(post.created_at)
        return !date.isSame(moment(), 'week') ? date.calendar(null, { sameElse: 'DD-MMM' }) : date.fromNow()
    }

    return (
        <div className='home-card'>
            <Card 
                hoverable
                loading={ loading }
                extra={postDate()}
                title={<><Avatar src={post.user.avatar} /><span className='home-card-author'>{post.user.name}</span></>}
                cover={<img alt={ post.title } src={ post.img } className='home-card-img'/>}
                >
                <Card.Meta
                    title={ post.title }
                    description={ post.content }
                    />
                <Link to={`/posts/${post.id}`}>more...</Link>
            </Card>
            {/* <p>{ post.title }</p> */}
        </div>
    )
}

export default HomeCard