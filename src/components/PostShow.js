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
import Typography from '@material-ui/core/Typography'


//Tag and Link imports
import Tag from './Tag'
import { Link } from "react-router-dom"
import '../PostShow.css'

//Misc.
import AvImg from '../images/avatar_placeholder.png'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  media: {
    width: '100%',
    maxHeight: '300px'
  },
  avatar: {
    width: 50,
    height: 50,
  },
  content: {
    padding: '10px',
    margin: '10px'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PostShow extends React.Component {
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
          <Typography >
        {post.img !== "" ?
        <img src={post.img} className={classes.media} alt="featured post"/> : null}
          {/* <DialogTitle classes={{margin: 0}}>
          {post.title}
        </DialogTitle> */}
        <div style={{'margin': '5px'}}>
            <Typography component='h3' variant='headline'>{post.title}</Typography>

            <Avatar alt={post.user.name} src={post.user.avatar === '' ? AvImg : post.user.avatar} className={classes.avatar} /> 
            
            <Typography component='span' variant="subheading" gutterBottom align="right">{post.user.username}</Typography>
                        
            <DialogContentText id="alert-dialog-slide-description">
            {post.content}
            </DialogContentText>
          {/* <div style={{'margin': '10px 0 0 20px'}}>
            <Avatar alt={post.user.name} src={post.user.avatar} className={classes.avatar} /> <span>{post.user.name}</span>
            </div>
          <Divider /> */}

            <div style={{'margin': '5px 0 0 0'}}>
              {post.post_tags.map((tag) => {
                return <Tag tag={tag} key={tag.id} />
              })}
            </div>

            </div>
              </Typography>
                      <Divider />

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

PostShow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostShow);
