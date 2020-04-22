import React, { PureComponent } from 'react'

import { Comment, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import { displayPostDate } from '../helper/functions'
import CommentEditor from './CommentEditor'


class MyComment extends PureComponent {
  constructor(){
    super()
    this.state = {
      replyToggle: false
    }
  }

  childComments = () => {
    const { comment, allComments } = this.props

    return allComments.filter(c => c.parent_id === comment.id)
  }

  handleReplyToggle = () => this.setState({ replyToggle: !this.state.replyToggle })


  submitCommentText = text => {

    const { createComment, user_id, post_id, parent_id } = this.props

    createComment({ comment: { text, user_id, post_id, parent_id } })
    this.setState({ replyToggle: false })
  }

  render() {
    const { comment, allComments, createComment, user_id, post_id } = this.props
    const { replyToggle } = this.state
    if (replyToggle) console.log('Toggle is on!')

    return (
      <>
        <Comment
          actions={[<span key="comment-nested-reply-to" onClick={this.handleReplyToggle}>Reply to</span>]}
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
        {
            replyToggle ? (
              <CommentEditor 
                submitCommentText={this.submitCommentText}
              />
            ) : null
        }
        {
          this.childComments().map(c => (
            <MyComment 
              key={c.id} 
              comment={c} 
              allComments={allComments}
              createComment={createComment}
              user_id={user_id}
              post_id={post_id}
              parent_id={c.id}
            />
          ))
        }
        </Comment>
      </>
    )
  }
}

export default MyComment