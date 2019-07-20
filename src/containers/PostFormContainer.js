import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import PostForm from '../components/PostForm'
import TagsContainer from '../components/ReactTagAutoComplete'

import { Link } from "react-router-dom";

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const transition = props => {
  return <Slide direction="up" {...props} />;
}

class PostFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.clearState()
  }

  // Update form with post info if post is being edited (indicated by the presence of a post id)
  componentDidMount() {
    const {post: {id, title, content, img, post_tags, tags}} = this.props

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

  handleChange = name => event => { // refactor to remove Material
    this.setState({
      [name]: event.target.value,
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
      tags: this.state.tags.map((tag, index) => index == i ? {...tag, status: 'delete'} : tag)
    })
  }

  handleTagAddition = (tag) => {
    this.setState({ tags: [...this.state.tags, {...tag, status: 'add'}]})
  }

  filterTags = () => {
    return this.state.tags.filter(tag => tag.status != 'delete')
  }

  render() {
    const { classes, name, tags, post } = this.props

    return (
      <div>
        <Dialog
          maxWidth='xl'
          open={this.state.open}
          TransitionComponent={transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton component={ Link } to="/" color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {name}
              </Typography>
              <Button component= { Link } to={post.id === undefined ? '/' : `/posts/${post.id}`} color="inherit" onClick={this.submit}>
                submit
              </Button>
            </Toolbar>
          </AppBar>
          <PostForm title={this.state.title} content={this.state.content} img={this.state.img} handleChange={this.handleChange}/>

          <TagsContainer tagSuggestions={tags} tags={this.filterTags()} handleTagDelete={ this.handleTagDelete} handleTagAddition={this.handleTagAddition}/>

        </Dialog>
      </div>
    );
  }
}

PostFormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostFormContainer);
