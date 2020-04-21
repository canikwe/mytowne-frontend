import React from 'react'
import Comment from '../components/Comment'


const CommentsContainer = ({comments}) => {

  const getParentComments = () => {
    return comments.filter(c => !c.parent_id)
  }

  return (
    <div className='comment-container'>
      <h3>Comments</h3>
      {
        getParentComments().map(c => <Comment key={c.id} comment={c} allComments={comments} />)
      }
    </div>
  )
}

export default CommentsContainer
