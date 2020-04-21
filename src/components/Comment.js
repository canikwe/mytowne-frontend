import React from 'react'
import { Comment, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import { displayPostDate } from '../helper/functions'


const MyComment = ({comment, allComments}) => {
  const childComments = allComments.filter(c => c.parent_id === comment.id)

  return (
    <Comment
      // key={comment.id}
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={
        <Link to={`/profile/${comment.user.id}`}>
          {comment.user.name}
        </Link>
      }
      avatar={
        <Link to={`/profile/${comment.user.id}`}>
          <Avatar
            src={comment.user.avatar}
            alt={`${comment.user.name}-avatar`}
          />
        </Link>
      }
      content={
        <p>{`${comment.id} - ${comment.text}`}</p>
      }
      datetime={displayPostDate(comment.created_at)}
    >
      {childComments.map(c => <MyComment key={c.id} comment={c} allComments={allComments} />)}
    </Comment>
  )
}

export default MyComment

    // <div className={comment.parent_id ? 'comment reply' : 'comment'}>
    //   <Icon type='message' /> <span className='segment'>{ comment.text }</span>
    // </div>