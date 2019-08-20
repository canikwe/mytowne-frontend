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
    console.log(post)
    const postDate = moment(post.created_at)
    
    return (
      <Fragment>
        <div className='card'>
          <div className='card-header'>
            <img src={!!post.user.avatar ? post.user.avatar : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt='avatar' className='card-avatar'/>
            <p className='card-date'>{ !postDate.isSame(moment(), 'week') ? postDate.calendar(null, {sameElse: 'DD-MMM'}) : postDate.fromNow() }</p>
          </div>
          <div className='img-container'>
            <Link className='card-link' to={`/posts/${post.id}`}>
              <img src={!!post.img ? post.img : 'https://imgplaceholder.com/350x225/ff7f7f/333333/fa-image'} className ='card-image' alt={post.title} />
            </Link>
          </div>
            <div className='card-content'>
              <h4 className='card-title'>{post.title}</h4>
              <div className='likes-container'>
                <i className='material-icons favorite' onClick={this.likePost}>{this.state.favorite}</i>
                <p>Likes</p>
              </div>
              {/* <p>{post.content}</p> */}
              {/* <Link to={`/posts/${post.id}`}>Click for More...</Link> */}
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
