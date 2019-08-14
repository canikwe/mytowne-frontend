import React from 'react'

const PostForm = ({ title, content, img, handleChange }) => {

  return (
    <form>
      <div>
        <label htmlFor='title'>Title: </label>
        <input 
          value={title}
          onChange={handleChange}
          name='title'
        />
      </div>
      <p/>
      <div>
        <label htmlFor='Content'>Content: </label>
        <textarea
          value={content}
          onChange={handleChange}
          rows="4"
          cols="50"
          name='content'
        />
      </div>
      <p/>
      <div>
        <label htmlFor='image'>Image: </label>
        <input
          value={img}
          onChange={handleChange}
          name='img'
        />
      </div>
    </form>
  )
}

export default PostForm
