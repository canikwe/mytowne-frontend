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
import PostTags from '../components/PostTags'
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
    this.state = {
      open: false,
      title: '',
      content: '',
      img: '',
      post_tags: [],
      tags: []
    }
  }

  //State Changes
  componentDidMount() {
    const {post: {title, content, img, post_tags, tags}} = this.props

    title !== undefined ?
    this.setState({
      open: true,
      title: title,
      content: content,
      img: img,
      post_tags: post_tags,
      newPostTags: [],
      deletedPostTags: [],
      tags: tags
    }) :
    this.setState({
      open: true,
      title: '',
      content: '',
      img: '',
      post_tags: [],
      newPostTags: [],
      deletedPostTags: [],
      tags: []
    })
  };

  handleClose = () => {
    this.setState({ open: false });

  };

  clearForm = () => {
    this.setState({
      open: false,
      title: '',
      content: '',
      img: '',
      post_tags: [],
      newPostTags: [],
      deletedPostTags: [],
      tags: []
     });
  }

  handleChange = name => event => {

    // debugger
    name === 'post_tags' ?
    this.setState({
      post_tags: event,
    }) :
    this.setState({
      [name]: event.target.value,
    });
  };

  //Post submissions
  submit = () => {
    const post = this.props.post
    //Send post info to App to persist to the database and add to all posts and clear form
    this.props.handleSubmit(this.formatPost(), post, this.state.deletedPostTags)
    this.clearForm()
    this.handleClose()
  };

  //return any postTags that were removed during edit

  //return any postTags that were added during edit/create
  addPostTags = () => {
    //debugger
  }



  //Formats post before database fetch
  formatPost(){
    //debugger
    // const post_tags = this.state.post_tags.map(t => {
    //   return {tag_id: t.value}
    // })


    const data = {
      post: {
        post_info: {
          user_id: this.props.user_id,
          title: this.state.title,
          content: this.state.content,
          img: this.state.img,
        },
        post_tags_attributes: this.state.tags
        // post_tags_attributes: this.state.post_tags
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

  formattedTags = () => {

    return this.props.tags.map(tag => this.formatTags(tag))
  }

  formatTags = postTag => {
    let value
    let label
    if (postTag.id && postTag.tag_name) {
      value = postTag.id
      label = postTag.tag_name
    } else if (!postTag.id) {
      value = postTag.value
      label = postTag.label
    } else {
      value = postTag.value
      label = postTag.name
    }

    // let value = postTag.id === undefined ? postTag.value : postTag.id
    // let label = postTag.id === undefined ? postTag.label : postTag.tag_name
    return { ...postTag, label: label, value: value }
  }

  displayPostTags = () => {
    return this.state.post_tags.map(tag => this.formatTags(tag))
  }

  handleTagDelete = (i) => {
    const { tags } = this.state;
    const deletedTag = tags.find((tag, index) => index == i)
    

    this.setState({
      tags: tags.map((tag, index) => index == i ? {...tag, status: 'delete'} : tag)
    })

    // this.setState({
    //   tags: tags.filter((tag, index) => index !== i)
    // })

    // if (deletedTag.id !== undefined) {
    //   deletedTag['status'] = 'delete'
    //   this.setState({deletedPostTags: [...this.state.deletedPostTags, deletedTag]})
    // }

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

          {/* <PostTags formattedTags={this.formattedTags()} postTags={this.displayPostTags()} handleChange={this.handleChange}/> */}

        </Dialog>
      </div>
    );
  }
}

PostFormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostFormContainer);
