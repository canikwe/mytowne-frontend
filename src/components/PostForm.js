import React from 'react';

const PostForm = ({ classes, title, content, img, handleChange }) => {

  return (
    <form>
      <div>
        <label htmlFor='title'>Title: </label>
        <input 
          value= {title}
          onChange={() => handleChange('title')}
        />
      </div>
      <p/>
      <div>
        <label htmlFor='Content'>Content: </label>
        <textarea
          value={content}
          onChange={() => handleChange('content')}
          rows="4"
          cols="50"
        />
      </div>
      <p/>
      <div>
        <label htmlFor='image'>Image: </label>
        <input
          value={img}
          onChange={handleChange('img')}
        />
      </div>

    </form>
  )

}

export default PostForm
