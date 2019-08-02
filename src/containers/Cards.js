import React, { PureComponent, Fragment } from 'react'
import Tag from '../components/Tag'
import { Link } from "react-router-dom";
import moment from 'moment'

class Cards extends PureComponent {
  state = {
    expanded: false
  }

  handleExpandClick = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  render() {
    const { post } = this.props
    
    return (
      <Fragment>
        <div 
          className='card'
          onClick={() => console.log('Someday I shall do something!')}
        >
          <h3>{post.title}</h3>
          <p>{ moment(post.created_at).calendar() }</p>
          <img src={post.img} className ='card-image' alttext={post.title} />
          <p>{post.content}</p>
          <Link to={`/posts/${post.id}`}>Click for More...</Link>
          <hr/>
          <div className='tag-container'>
            {post.post_tags.map((tag) => {
              return <Tag tag={tag} key={tag.id} />
            })}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Cards
