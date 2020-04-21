import React from 'react'
import Tag from '../components/Tag'
import { displayPostDate, replaceMissingImg } from '../helper/functions'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
// import moment from 'moment'

const PostTile = ({ post, handleTagClick, delay }) => {

  // const handleMissingImg = e => {
  //   e.target.src = 'images/placeholder.png'
  // }

  return (
    <div className={`segment profile-post animated slideInRight delay-${delay}`}>
      <div className='post-tile-contents'>
          <div className='tile-item'>
            {post.post_tags.map(pt => <Tag key={pt.id} tag={pt} handleTagClick={handleTagClick}/>)}
          </div>

          <Link to={`/posts/${post.id}`}>
            <div className='tile-item'>
              <h3>{post.title}</h3>
            </div>
          </Link>
          
          <div className='tile-item'>
            {post.content.length > 90 ?
              `${post.content.slice(0, 90)}...`
                :
              post.content
            }
          </div>
      </div>
      <div className='post-tile-extra'>
        <div className='post-tile-date'>
          {displayPostDate(post.created_at)}
        </div>
        <div className='post-tile-comments'>
          10 comments
        </div>
        <div className='post-tile-likes'>
          {post.likes.length} <Icon type='heart' />
        </div>
      </div>
      <div className='post-tile-img-container'>
        <img className='post-tile-img' alt={post.title} src={post.img} onError={replaceMissingImg}/>
      </div>
   </div>
  )
}

export default PostTile

/*
 <div className={`post-card${className}`}>
      <Card
        hoverable
        loading={ loading }
        extra={!loading ? postDate() : null}
        title={(
          !loading ?
          <Link to={`/profile/${post.user.id}`}>
            <Avatar src={post.user.avatar} />
            <span className='post-card-author'>{post.user.name}</span>
          </Link>
          : null
        )}
        cover={(
          !loading ?
          <img
            alt={ post.title }
            src={ post.img }
            className='post-card-img'
            onError={handleMissingImg}
          />
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
*/