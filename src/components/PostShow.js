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
            <DialogContentText id="alert-dialog-slide-description">
            {post.content}
            </DialogContentText>
          </DialogContent>
            <div style={{'margin': '0 0 0 20px'}}>
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
