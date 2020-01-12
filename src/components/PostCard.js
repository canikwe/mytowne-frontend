import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Avatar } from 'antd'
import moment from 'moment'

const PostCard = ({ post, loading }) => {

  const postDate = () => {
    const date = moment(post.created_at)
    return !date.isSame(moment(), 'week') ? date.calendar(null, { sameElse: 'DD-MMM' }) : date.fromNow()
  }

  return (
    <div className='post-card'>
      <Card 
        hoverable
        loading={ loading }
        extra={!loading ? postDate() : null}
        title={(
          !loading ?
          <>
            <Avatar src={post.user.avatar} />
            <span className='post-card-author'>{post.user.name}</span>
          </>
          : null
        )}
        cover={(
          !loading ?
          <img alt={ post.title } src={ post.img } className='post-card-img'/>
          : null
        )}
        actions={[
          <Icon type='heart' style={{color: 'red'}} key='heart' />,
          <Link to={`/posts/${post.id}`}><Icon type='ellipsis' key='ellipsis' /></Link>
        ]}
      >
        <Card.Meta
          title={ post.title }
          description={ post.content }
        />
      </Card>
    </div>
  )
}

export default PostCard