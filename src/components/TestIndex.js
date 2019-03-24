import React from 'react'

//Testing purposes only. Needed to confirm featured post and delete handlers work correctly
export default ({posts, handleClick, handleDelete}) => {
  console.log(posts)
  return (
    <div>
      <h1>Test Index for Featured Post Onclick Handler</h1>
        {posts.map(p => (
          <div key={p.id}>
          <h3>{p.title}</h3>
          <button onClick={() => handleClick(p)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <hr></hr>
          </div>
          ))}
    </div>
  )
}