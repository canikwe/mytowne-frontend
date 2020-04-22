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

  render() {
    const { comment, allComments } = this.props
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
          replyToggle ? <CommentEditor /> : null
        }
        {
          this.childComments().map(c => <MyComment key={c.id} comment={c} allComments={allComments} />)
        }
        </Comment>
      </>
    )
  }
}

export default MyComment