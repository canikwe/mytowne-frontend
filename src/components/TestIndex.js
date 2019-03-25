import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


//Testing purposes only. Needed to confirm featured post and delete handlers work correctly
export default ({posts, handleClick, handleDelete}) => {
  return (
    <div>
      <h1>Test Index for Featured Post Onclick Handler</h1>
        {posts.map(p => (
          <div key={p.id}>
          <h3>{p.title}</h3>
          <button onClick={() => handleClick(p)}>Show Post</button>
          <Link to='/'>Home</Link>
          <Link to={`/posts/${p.id}`}>ShowPage</Link>
          <button onClick={handleDelete}>Delete</button>
          <hr></hr>
          </div>
          ))}
    </div>
  )
}