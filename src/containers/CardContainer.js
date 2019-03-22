import React from 'react'
import Cards from '../components/Cards'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  gridItem: {
    padding: theme.spacing.unit,
  },
})

const CardContainer = (props) => {
  const{ classes } = props

  return (
    <Grid container>
      <Grid item xs={3} className={classes.gridItem}>
        <Cards />
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Cards />
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Cards />
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Cards />
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Cards />
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Cards />
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Cards />
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Cards />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(CardContainer)
