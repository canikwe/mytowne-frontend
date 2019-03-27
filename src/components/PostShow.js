import React from 'react';
//Button style imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

//Modal style imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';


//Tag and Link imports
import Tag from './Tag'
import { Link } from "react-router-dom"
import '../PostShow.css'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  media: {
    maxWidth: '100%',
    maxHeight: '500px'
  },
  avatar: {
    width: 60,
    height: 60,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, post, handleDelete, user } = this.props
    console.log(post)
    return (
      <div>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          // onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          classes={{paper: 'box'}}
        >
        {post.img !== "" ?
        <img src={post.img} className={classes.media} alt="featured post"/> : null}
          <DialogTitle id="alert-dialog-slide-title">
            {post.title}
          </DialogTitle>
          <DialogContent>

            <Avatar alt={post.user.name} src={post.user.avatar} className={classes.avatar} /> <span>{post.user.username}</span>
                        
            <DialogContentText id="alert-dialog-slide-description">
            {post.content}
            </DialogContentText>
          </DialogContent>
          <Divider />
          {/* <div style={{'margin': '10px 0 0 20px'}}>
            <Avatar alt={post.user.name} src={post.user.avatar} className={classes.avatar} /> <span>{post.user.name}</span>
          </div>
          <Divider /> */}

            <div style={{'margin': '10px 0 0 20px'}}>
              {post.post_tags.map((tag) => {
                return <Tag tag={tag} key={tag.id} />
              })}
            </div>
          <DialogActions>
            <IconButton component={ Link } to={'/'} onClick={this.handleClose} color="primary" className={classes.button} aria-label="Back">
              <BackIcon />
            </IconButton>
            {user.id === post.user.id ?
            <React.Fragment>
              <IconButton component={ Link } to={`/posts/${post.id}/edit`} onClick={this.handleClose} color="primary"className={classes.button} aria-label="Edit">
                <EditIcon />
              </IconButton>
              <IconButton component={ Link } to="/" onClick={() => handleDelete(post.id)} className={classes.button} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
           </React.Fragment>
            : null }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialogSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlertDialogSlide);
