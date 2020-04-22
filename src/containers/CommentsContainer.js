import React from 'react'
import Comment from '../components/Comment'


const CommentsContainer = ({ comments, createComment, user_id, post_id }) => {

  const getParentComments = () => {
    return comments.filter(c => !c.parent_id)
  }

  return (
    <div className='comment-container'>
      <h3>Comments</h3>
      {
        getParentComments().map(c => (
          <Comment 
            key={c.id} 
            comment={c} 
            allComments={comments} 
            createComment={createComment}
            user_id={user_id}
            post_id={post_id}
          />
        ))
      }
    </div>
  )
}

export default CommentsContainer
