import React from 'react';
import CardContainer from '../components/CardContainer'
import { Link } from 'react-router-dom'
//Button style imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import BackIcon from '@material-ui/icons/ArrowBack'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'

//Modal style imports
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  media: {
    height: 'auto',
    maxWidth: '75%',
    margin: theme.spacing.unit,
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Profile extends React.Component {
  state = {
    open: true
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, user } = this.props

    return (
      <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth={false}
        // onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Grid container style={{height: 'auto'}}>
          <Grid item xs={5} style={{textAlign: 'center'}}>
            {user.avatar !== "" ?
              <img className={classes.media} src={user.avatar} alt="user avatar"/> : null}
          </Grid>
          <Grid item xs={7}>
            <DialogTitle id="alert-dialog-slide-title">
              {user.name}&nbsp;
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {user.bio}
              </DialogContentText>
            </DialogContent>
          </Grid>

          <Grid item xs={12}>
            <div style={{width: '100%', height: '5px'}}/>
            {user.posts ? (
              <CardContainer posts={user.posts} name={user.name} avatar={user.avatar} />
            ) : null}
            <DialogActions>
              <IconButton component={ Link } to={'/'} onClick={this.handleClose} color="primary" className={classes.button} aria-label="Back">
                <BackIcon />
              </IconButton>
              <IconButton component={ Link } to={`/profile/edit`} onClick={this.handleClose} color="primary" className={classes.button} aria-label="Edit">
                <EditIcon />
              </IconButton>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)
