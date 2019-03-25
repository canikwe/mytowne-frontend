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
  const{ classes, posts } = props

  return (
    <Grid container>
      {posts.map((post) => {
        return (
          <Grid item xs={3} className={classes.gridItem} key={post.id}>
            <Cards post={post} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default withStyles(styles)(CardContainer)
