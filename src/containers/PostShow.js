import React from 'react'
import Tag from '../components/Tag'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '../PostShow.css'

const PostShow = props => {

  const { post, handleDelete, user } = props
  return (
    <div className='post-container'>
      <div className='post' >
        <div>
          <div>
            {post.img !== "" ?
            <img src={post.img} alt="featured post" className='card-image'/> : null}
            {/* Likes will go here */}
          </div>

          <div className='align-content post-header'>
            <h2>{post.title}</h2>
            <span>{ moment(post.created_at).format('DD-MMM') }</span>
          </div>


          <div>
            {post.content}
          </div>

            
          <div className='align-content post-admin'>
            {
              user.id === post.user.id ?
                <React.Fragment>
                  <Link to={`/posts/${post.id}/edit`} >
                    Edit
                  </Link> | 
                  <Link to="/" onClick={() => handleDelete(post.id)}>
                    Delete
                  </Link>
                </React.Fragment>
              : null
            }

            {post.user.avatar === '' ?
              null
              :
              // use the Avatar component here?
              <img alt={post.user.name} src={post.user.avatar} className='card-avatar'/>} 
            
            <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
          </div>
          
          <hr />

          <div>
            {post.post_tags.map(tag => <Tag tag={tag} key={tag.id} />)}
          </div>

          <div>
            <textarea placeholder='Comment Box'></textarea>
          </div>

          <div>
            <h3>Fake Comments</h3>
            <ul>
              <li>Hello</li>
              <li>Goodbye</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
  
}

export default PostShow
