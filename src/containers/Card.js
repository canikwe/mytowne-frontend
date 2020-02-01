import React from 'react'
import { Card as OtherCard, Avatar } from 'antd'
// import Avatar from '../components/Avatar'
import Tag from '../components/Tag'
import Likes from '../components/Likes'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { render } from 'react-dom'

class Card extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      className: ''
    }
  }

  displayPostDate = () => {
    const { post, handleTagClick, user, addLike, removeLike, like } = this.props

    const postDate = moment(post.created_at)

    return !postDate.isSame(moment(), 'week') ? postDate.calendar(null, { sameElse: 'DD-MMM' }) : postDate.fromNow()
  }

  likePost = () => {
    const { post, handleTagClick, user, addLike, removeLike, like } = this.props

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


    console.log(post.title, 'width: ', e.target.width, 'height: ', e.target.height)

    if (post.likes.length > 2) {
      this.setState({ className: 'big'})
    } else if (post.img === '') {
      this.setState({ className: ''})
    }
    else if (e.target.width > e.target.height * 1.75) {
      this.setState({ className: 'horizontal' })
    } else if (e.target.height > e.target.width * 1.75) {
      this.setState({ className: 'vertical' })
    }
  }

  render() {
    const { post, handleTagClick, user, addLike, removeLike, like } = this.props
    const { className } = this.state

    return (
      <div className={`${className} segment`}>
        <Link to={`/posts/${post.id}`}>
          <img 
            alt={post.title} 
            id={post.title} 
            className='my-image'
            src={post.img} 
            onError={this.handleMissingImg}
            onLoad={this.updateClass}
        />
        <div className='details'>
          {post.title}
        </div>
              </Link>

      </div>
        /* <OtherCard
          hoverable
          // style={{width: '240px'}}
          cover={<img alt={post.title} id={post.title} src={post.img} onError={this.handleMissingImg}
            // style={{ width: '100%' }}
/>}
          onLoad={this.updateClass}
          className={className}
          size='small'
        >
          <OtherCard.Meta title={<Link to={`/posts/${post.id}`}>{post.title}</Link>} description={this.displayPostDate()} />
          <div className='tag-container'>
            {post.post_tags.map((tag) => {
              return <Tag key={tag.id} tag={tag} handleTagClick={handleTagClick} />
            })}
          </div>
        </OtherCard> */
        //  <div className='card'>

        //   <div className='card-header'>
        //     <Link to={`/profile/${post.user.id}`}>
        //       <div className='card-username'>
        //         <Avatar 
        //           src={!!post.user.avatar ? post.user.avatar : 'images/avatar_placeholder.png'} 
        //           alt={post.user.name} 
        //         />
        //         <span>{post.user.name}</span>
        //       </div>
        //     </Link>

        //     <p className='card-date'>
        //       { !postDate.isSame(moment(), 'week') ? postDate.calendar(null, {sameElse: 'DD-MMM'}) : postDate.fromNow() }
        //     </p>
        //   </div>

        //   <div className='img-container'>
        //     <Link to={`/posts/${post.id}`}>
        //       <img src={!!post.img ? post.img : '/images/placeholder.png'} className ='card-image' alt={post.title} />
        //     </Link>
        //   </div>
        //     <div className='card-content'>
        //       <h4 className='card-title'>{post.title}</h4>
        //       <Likes
        //         icon={like ? 'material-icons favorite' : 'material-icons not-favorite'}
        //         likePost={likePost}
        //         like={like ? 'favorite' : 'favorite_border'}
        //         likesCount={post.likes.length}
        //       />
        //     </div>
        //   <hr/>
        //   <div className='tag-container'>
        //     {post.post_tags.map((tag) => {
        //       return <Tag key={tag.id} tag={tag} handleTagClick={ handleTagClick }/>
        //     })}
        //   </div>
        // </div>
    )
  }
}

export default Card
