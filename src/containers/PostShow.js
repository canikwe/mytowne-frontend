import React, { PureComponent } from 'react'
import Tag from '../components/Tag'
import { Link } from "react-router-dom"
import '../PostShow.css'

class PostShow extends PureComponent {
  state = { open: true }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { post, handleDelete, user } = this.props
    return (
      <div>
        {post.img !== "" ?
        <img src={post.img} alt="featured post"/> : null}

        <div>
          <h3>{post.title}</h3>

          {post.user.avatar === '' ?
            null
            :
            <img alt={post.user.name} src={post.user.avatar} />}
          
          <p>{post.user.username}</p>   
          <p>{post.content}</p>
          <hr></hr>
          <div>
            {post.post_tags.map(tag => <Tag tag={tag} key={tag.id} />)}
          </div>
        </div>

        {
          user.id === post.user.id ?
            <React.Fragment>
              <Link to={`/posts/${post.id}/edit`} onClick={this.handleClose} >
                Edit
              </Link>
              <Link to="/" onClick={() => handleDelete(post.id)}>
                Delete
              </Link>
            </React.Fragment>
          : null
        }
      </div>
    )
  }
}

export default PostShow
