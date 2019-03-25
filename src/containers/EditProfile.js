import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#f4f4f4',
    height: '100vw'
  },
  item: {
    backgroundColor: '#f4f4f4',
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

class EditProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      birth_date: '',
      email: '',
      username: '',
      town: '',
      avatar: '',
      bio: ''
    }
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave = () => {
    this.props.editUser(this.state, this.props.user.id)
  }


  render() {
    const { classes } = this.props
    return(
      <div className={classes.container}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} className={classes.item}>
            <TextField
              label="Name"
              name="name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
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
          <Grid item xs={12} sm={6} className={classes.item}>
            <TextField
              label="Email"
              name="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <TextField
              label="Username"
              name="username"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <TextField
              label="Town"
              name="town"
              className={classes.textField}
              value={this.state.town}
              onChange={this.handleChange}
              margin="normal"
              // disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <TextField
              label="Avatar URL"
              name="avatar"
              className={classes.textField}
              value={this.state.avatar}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <TextField
              label="Biography"
              name="bio"
              className={classes.textField}
              value={this.state.bio}
              onChange={this.handleChange}
              margin="normal"
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
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
      </div>
    )
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)
