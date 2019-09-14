import React from 'react'
import EditorContainer from '../containers/EditorContainer'

const PostForm = ({ title, content, img, handleChange }) => {

  return (
    <div className=''>
      <form>
        <div className='input-label'>
          <label htmlFor='title'>Title: </label>
        </div>
        <div className='input'>
          <input 
            value={title}
            onChange={handleChange}
            name='title'
          />
        </div>
        <p/>
        <div className='input-label'>
          <label htmlFor='Content'>Content: </label>
        </div>
        <div className='input'>

        {/* <EditorContainer /> */}

          <textarea
            value={content}
            onChange={handleChange}
            rows="4"
            cols="50"
            name='content'
          />


        </div>
        <p/>
        <div className='input-label'>
          <label htmlFor='image'>Image: </label>
        </div>
        <div className='input'>
          <input
            value={img}
            onChange={handleChange}
            name='img'
          />
        </div>
      </form>
    </div>
  )
}

export default PostForm
