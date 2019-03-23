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

import NewPostForm from '../components/NewPostForm'

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
  state = {
    open: false,
    title: '',
    content: '',
    img: '',
    tags: [],

  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    const tags = this.state.tags.map(t => {
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
        post_tags_attributes: tags
      }
    }

    this.props.createPost(data)
    this.setState({ 
      open: false,
      title: '',
      content: '',
      img: '',
      tags: []
     });
  };

  handleChange = name => event => {
    name === 'tags' ?

    this.setState({
      [name]: event,
    }) :
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
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
                New Post
              </Typography>
              <Button color="inherit" onClick={this.handleSave}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <NewPostForm title={this.state.title} content={this.state.content} postTags={this.state.tags} handleChange={this.handleChange}/>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
