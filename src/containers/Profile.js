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
          <Grid item xs={5}>
            <Typography variant="h5" component="h3">
              {/* <img src={user.avatar} /> */}
              Avatar
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography component="p">
              {/* {user.bio} */}
              About me: <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
          <Grid item xs={12} style={{height: '25px'}} />
          <Grid item xs={3}>
            post 1
          </Grid>
          <Grid item xs={3}>
            post 2
          </Grid>
          <Grid item xs={3}>
            post 3
          </Grid>
          <Grid item xs={3}>
            post 4
          </Grid>
          <Grid item xs={12} style={{height: '25px'}} />
          <Grid item xs={3}>
            post 5
          </Grid>
          <Grid item xs={3}>
            post 6
          </Grid>
          <Grid item xs={3}>
            post 7
          </Grid>
          <Grid item xs={3}>
            post 8
          </Grid>
          {/* <CardContainer posts={user.posts} /> */}
        </Grid>
      </Paper>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)
