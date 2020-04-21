import React from 'react'
import { Icon, Comment, Avatar } from 'antd'


const CommentsContainer = ({comments}) => {
  const renderParentComments = () => {
    return comments.filter(c => !c.parent_id)
  }

  const renderChildren = (comment, allComments) => {
    const children = allComments.filter(c => c.parent_id === comment.id)
    if (!children.length) {
      return (
        <Comment
          key={comment.id}
          actions={[<span key="comment-nested-reply-to">Reply to</span>]}
          author={<a>Han Solo</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <p>{`${comment.id} - ${comment.text}`}</p>
          }
        />
      )
    } else {
      return (
        <Comment
          key={comment.id}
          actions={[<span key="comment-nested-reply-to">Reply to</span>]}
          author={<a>Han Solo</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <p>{`${comment.id} - ${comment.text}`}</p>
          }
        >
          {children.map(c => renderChildren(c, allComments))}
        </Comment>
      )
    }
  }

  return (
    <div className='comment-container'>
      <h3>Comments</h3>
      {
        renderParentComments().map(c => {
          return(
            // <Comment
            //   key={c.id}
            //   actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            //   author={<a>Han Solo</a>}
            //   avatar={
            //     <Avatar
            //       src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            //       alt="Han Solo"
            //     />
            //   }
            //   content={
            //     <p>{`${c.id} - ${c.text}`}</p>
            //   }
            // >
              renderChildren(c, comments)
            // </Comment>
          )
        })
      }
    </div>
  )
}

export default CommentsContainer

/*
            <div className='comment-container'>
              {
                post.comments.map(c => {
                  return (
                    <Comment key={c.id} comment={c} allComments={post.comments}>
                      <Comment key={c.id} comment={c} allComments={post.comments} />
                    </Comment>
                  )
                })
              }

               <div className='comment'>
                <Icon type='message' /> <span className='segment'>Goodbye</span>
              </div> 
            </div>
*/