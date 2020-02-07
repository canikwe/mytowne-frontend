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
    // debugger
    // console.log(e.target)
    console.log(`w: ${e.target.naturalWidth}, h: ${e.target.naturalHeight}`)
    const { post } = this.props

    if (this.props.className) {
      this.setState({ className: 'small' })
    } else if (post.likes.length > 2) {
      this.setState({ className: 'big'})
    } else if (e.target.naturalWidth > e.target.naturalHeight * 1.5) {
      this.setState({ className: 'horizontal' })
    } else if (e.target.naturalHeight > e.target.naturalWidth * 1.5) {
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
        <div className='post-date'>
          {this.displayPostDate()}
        </div>
        <div className='details'>
          <div className='title'>
            {post.title.slice(0, 40)}...
          </div>
          
          {/* <div className='post-date'>
            {this.displayPostDate()}
          </div> */}
          {/* {
            className === 'big' ? <div>{post.content}</div> : null
          } */}
          <div className='tag-container'>
            { post.tags.map(t => <span className='tag' key={t.id}>{t.name}</span>) }
          </div>
        </div>
      </div>
    )
  }
}

export default Card
