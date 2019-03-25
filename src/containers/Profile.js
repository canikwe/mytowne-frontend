import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CardContainer from './CardContainer'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})


class Profile extends React.Component {

  render() {
    const { classes, user } = this.props
    console.log(user)

    return (
      <Paper className={classes.root} elevation={1}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" component="h3">
              <img src={user.avatar} alt="user avatar" />
              {user.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p">
              About me: <br />
              {user.bio}
            </Typography>
          </Grid>
          <Grid item xs={10} style={{height: '25px'}} />
          {user.posts ? (
            <CardContainer posts={user.posts} name={user.name} avatar={user.avatar} />
          ) : null}
        </Grid>
      </Paper>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)
