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

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      title: '',
      content: '',
      img: '',
      post_tags: [],

    }
  }

  //State Changes
  handleClickOpen = () => {
    const {post: {title, content, img, post_tags}} = this.props

    title !== undefined ? 
    this.setState({ 
      open: true,
      title: title,
      content: content,
      img: img,
      post_tags: post_tags,
    }) :
    this.setState({
      open: true, 
      title: '',
      content: '',
      img: '',
      post_tags: [],
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
      post_tags: []
     });
  }

  handleChange = name => event => {
    name === 'tags' ?
    this.setState({
      post_tags: event,
    }) :
    this.setState({
      [name]: event.target.value,
    });
  };

  //Post submissions
  submit = () => {
    //Send post info to App to persist to the database and add to all posts and clear form
    this.props.handleSubmit(this.formatPost())
    this.clearForm()
  };
  
  //Formats post before database fetch
  formatPost(){    
    const post_tags = this.state.post_tags.map(t => {
      return {tag_id: t.value}
    })
  
    const data = {
      post: {
        post_info: {
          user_id: this.props.user_id,
          title: this.state.title,
          content: this.state.content,
          img: this.state.img,
        },
        post_tags_attributes: post_tags
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

  render() {
    const { classes, handleDelete, name } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open full-screen dialog
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {name}
              </Typography>
              <Button color="inherit" onClick={handleDelete}>
                delete
              </Button>
              <Button color="inherit" onClick={this.save}>
                save
              </Button>
              <Button color="inherit" onClick={this.submit}>
                submit
              </Button>
            </Toolbar>
          </AppBar>
          <PostForm title={this.state.title} content={this.state.content} postTags={this.state.post_tags} handleChange={this.handleChange}/>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
