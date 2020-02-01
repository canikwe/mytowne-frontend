import React from 'react'
// import { Card as OtherCard, Avatar } from 'antd'
// import Avatar from '../components/Avatar'
// import Tag from '../components/Tag'
// import Likes from '../components/Likes'
import { Link } from 'react-router-dom'
import moment from 'moment'
// import { render } from 'react-dom'

class Card extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      className: 'regular'
    }
  }

  displayPostDate = () => {
    const { post} = this.props

    const postDate = moment(post.created_at)

    return !postDate.isSame(moment(), 'week') ? postDate.calendar(null, { sameElse: 'DD-MMM' }) : postDate.fromNow()
  }

  likePost = () => {
    const { post, user, addLike, removeLike, like } = this.props

    if (like){
      removeLike(like.id)
    } else {
      const likeData = {
        like: {
          user_id: user.id,
          post_id: post.id
        }
      }
      addLike(likeData)
    }
  }

  handleMissingImg = e => {
    e.target.src = 'images/placeholder.png'
  }

  updateClass = e => {

    const { post } = this.props

    if (post.likes.length > 2) {
      this.setState({ className: 'big'})
    } 
    // else if (post.img === '') {
    //   this.setState({ className: ''})
    // }
    else if (e.target.width > e.target.height * 1.75) {
      this.setState({ className: 'horizontal' })
    } else if (e.target.height > e.target.width * 1.75) {
      this.setState({ className: 'vertical' })
    }
  }

  render() {
    const { post } = this.props
      // , handleTagClick, user, addLike, removeLike, like
    const { className } = this.state

    return (
      <div className={`${className} segment hover`}>
        <div className='pin'></div>
        <Link to={`/posts/${post.id}`}>
          <img 
            alt={post.title} 
            id={post.title} 
            className='small card image'
            src={post.img} 
            onError={this.handleMissingImg}
            onLoad={this.updateClass}
          />
        </Link>
        <div className='details'>
          {post.title}
        </div>
      </div>
    )
  }
}

export default Card
