import React from 'react'
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
                title={ post.title }
                cover={<img alt={ post.title } src={ post.img } className='home-card-img'/>}
                >
                <Card.Meta
                    avatar={
                        <Avatar src={ post.user.avatar } />
                    }
                    description={ post.content }
                    />
            </Card>
            {/* <p>{ post.title }</p> */}
        </div>
    )
}

export default HomeCard