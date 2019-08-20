import React, { PureComponent, Fragment } from 'react'
import Tag from '../components/Tag'
import { Link } from "react-router-dom"
import moment from 'moment'

class Cards extends PureComponent {
  constructor() {
    super()
    this.state = {
      expanded: false,
      favorite: 'favorite_border'
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  likePost = () => {
    let favorite = this.state.favorite === 'favorite_border' ? 'favorite' : 'favorite_border'
    this.setState({favorite})
  }

  render() {
    const { post } = this.props
    
    return (
      <Fragment>
        <div 
          className='card'
          onClick={() => console.log('Someday I shall do something!')}
        >
          <div className='img-container'>
            <img src={!!post.img ? post.img : 'https://imgplaceholder.com/350x225/ff7f7f/333333/fa-image'} className ='card-image' alt={post.title} />
            <i className='material-icons favorite' onClick={this.likePost}>{this.state.favorite}</i>
          </div>
          <div className='card-content'>
            <h4>{post.title}</h4>
            <p>{ moment(post.created_at).calendar() }</p>
            {/* <p>{post.content}</p> */}
            <Link to={`/posts/${post.id}`}>Click for More...</Link>
          </div>
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
