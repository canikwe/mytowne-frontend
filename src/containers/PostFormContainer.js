import React from 'react'
import PostForm from '../components/PostForm'
import TagsContainer from '../components/ReactTagAutoComplete'
import { Link } from "react-router-dom"

class PostFormContainer extends React.Component {
  constructor() {
    super()
    this.state = this.clearState()
  }

  // Update form with post info if post is being edited (indicated by the presence of a post id)
  componentDidMount() {
    const {post: {id, title, content, img, tags}} = this.props

    id !== undefined ?
    this.setState({
      open: true,
      title: title,
      content: content,
      img: img,
      tags: tags
    }) :
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  clearState = () => {
    return ({
      open: false,
      title: '',
      content: '',
      img: '',
      tags: []
    })
  }

  handleChange = event => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  // Send post info to App to persist to the database and add to all posts, clear form, close modal
  submit = () => {
    const post = this.props.post
    this.props.handleSubmit(this.formatPost(), post, this.state.deletedPostTags)
    this.handleClose()
    this.setState(this.clearState())
  }

  //Formats post before database fetch
  formatPost = () => {
    const data = {
      post: {
        post_info: {
          user_id: this.props.user_id,
          title: this.state.title,
          content: this.state.content,
          img: this.state.img,
        },
        post_tags_attributes: this.state.tags
      }
    }
    return data
  }

  //Possible feature to save posts as drafts before publishing them
  save = () => {
    const post = this.formatPost()
    post.post['post_info'].submitted = false

    //Send post to a drafts array in App state and clear form
    this.props.handleSave(post)
    this.clearForm()
  }

  handleTagDelete = (i) => {
    this.setState({
      tags: this.state.tags.map((tag, index) => index === i ? {...tag, status: 'delete'} : tag)
    })
  }

  handleTagAddition = (tag) => {
    this.setState({ tags: [...this.state.tags, {...tag, status: 'add'}]})
  }

  filterTags = () => {
    return this.state.tags.filter(tag => tag.status !== 'delete')
  }

  render() {
    const { name, tags, post } = this.props

    return (
      <div>
        <h3> {name} </h3>
        <Link to={post.id === undefined ? '/' : `/posts/${post.id}`} onClick={this.submit}> submit </Link>
        <PostForm title={this.state.title} content={this.state.content} img={this.state.img} handleChange={this.handleChange}/>
        <TagsContainer tagSuggestions={tags} tags={this.filterTags()} handleTagDelete={ this.handleTagDelete} handleTagAddition={this.handleTagAddition}/>
      </div>
    )
  }
}

export default PostFormContainer
