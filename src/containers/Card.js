import React, { PureComponent, Fragment } from 'react'
import Avatar from '../components/Avatar'
import Tag from '../components/Tag'
import { Link } from "react-router-dom"
import moment from 'moment'

class Card extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      favorite: props.post.likes.map(like => like.user_id).includes(props.user.id),
      favClassName: 'grey'
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  likePost = () => {
    const likeData = {
      like: {
        user_id: this.props.user.id,
        post_id: this.props.post.id
      }
    }

    if (this.state.favorite){
      const like = this.props.post.likes.find(like => like.user_id === this.props.user.id)
      this.props.removeLike(like.id)
    } else {
      this.props.addLike(likeData)
    }

    this.setState({favorite: !this.state.favorite})
  }

  render() {
    const { post } = this.props
    const postDate = moment(post.created_at)
    
    return (
      <Fragment>
        <div className='card'>

          <div className='card-header'>
            <Link to={`/profile/${post.user.id}`}>
              <div className='card-username'>
                <Avatar 
                  src={!!post.user.avatar ? post.user.avatar : 'images/avatar_placeholder.png'} 
                  alt={post.user.name} 
                />
                <span>{post.user.name}</span>
              </div>
            </Link>

            <p className='card-date'>{ !postDate.isSame(moment(), 'week') ? postDate.calendar(null, {sameElse: 'DD-MMM'}) : postDate.fromNow() }</p>
          </div>

          <div className='img-container'>
            <Link className='card-link' to={`/posts/${post.id}`}>
              <img src={!!post.img ? post.img : '/images/placeholder.png'} className ='card-image' alt={post.title} />
            </Link>
          </div>
            <div className='card-content'>
              <h4 className='card-title'>{post.title}</h4>
              <div className='likes-container'>
                <i className={this.state.favorite ? 'material-icons favorite' : 'material-icons not-favorite'} onClick={ this.likePost }>{this.state.favorite ? 'favorite' : 'favorite_border'}</i>
                <p>{ post.likes.length } Likes</p>
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

export default Card
