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
      {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => {
        return (
          <Grid item xs={4} className={classes.gridItem} key={post.id}>
            {props.name ? (
              <Cards post={post} name={props.name} avatar={props.avatar} />
            ) : (
              <Cards post={post} />
            )}
          </Grid>
        )
      })}
    </Grid>
  )
}

export default withStyles(styles)(CardContainer)
