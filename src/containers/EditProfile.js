import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
//Button style imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import BackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';

//Modal style imports
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: true,
      name: '',
      birth_date: '',
      email: '',
      username: '',
      town: '',
      avatar: '',
      bio: ''
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.name !== this.state.name) {
      this.setState({
        name: this.props.user.name,
        birth_date: this.props.user.birth_date,
        email: this.props.user.email,
        username: this.props.user.username,
        town: this.props.user.town,
        avatar: this.props.user.avatar,
        bio: this.props.user.bio
      })
    }
  }

  componentDidMount(prevProps) {
    if (this.props.user.name !== this.state.name) {
      this.setState({
        name: this.props.user.name,
        birth_date: this.props.user.birth_date,
        email: this.props.user.email,
        username: this.props.user.username,
        town: this.props.user.town,
        avatar: this.props.user.avatar,
        bio: this.props.user.bio
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave = () => {
    this.props.editUser(this.state, this.props.user.id)
  }


  render() {
    const { classes, deleteUser } = this.props
    return(
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
        <DialogTitle id="alert-dialog-slide-title">
          Edit Your Profile:
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <DialogContentText id="alert-dialog-slide-description">
            </DialogContentText>
            <Grid container spacing={24} className={classes.container}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  className={classes.textField}
                  value={this.state.name}
                  defaultValue=" "
                  onChange={this.handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Birthday"
                  name="birth_date"
                  type="date"
                  // defaultValue="2017-05-24"
                  className={classes.textField}
                  value={this.state.birth_date}
                  onChange={this.handleChange}
                  InputLabelProps={{
                      shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  className={classes.textField}
                  value={this.state.email}
                  defaultValue=" "
                  onChange={this.handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  name="username"
                  className={classes.textField}
                  value={this.state.username}
                  defaultValue=" "
                  onChange={this.handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Town"
                  name="town"
                  className={classes.textField}
                  value={this.state.town}
                  defaultValue=" "
                  onChange={this.handleChange}
                  margin="normal"
                  // disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Avatar URL"
                  name="avatar"
                  className={classes.textField}
                  value={this.state.avatar}
                  defaultValue=" "
                  onChange={this.handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Biography"
                  name="bio"
                  className={classes.textField}
                  value={this.state.bio}
                  defaultValue=" "
                  onChange={this.handleChange}
                  margin="normal"
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleSave}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <IconButton component={ Link } to={'/'} onClick={this.handleClose} color="primary" className={classes.button} aria-label="Back">
            <BackIcon />
          </IconButton>
          <IconButton component={ Link } to="/" onClick={() => deleteUser(this.props.user.id)} className={classes.button} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    )
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)
