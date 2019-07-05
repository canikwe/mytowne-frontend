import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../containers/Cards'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import '../Cards.css'

const styles = theme => ({
  gridItem: {
    position: 'relative',
    padding: theme.spacing.unit,
  },
})

const CardContainer = ({ classes, posts, name, avatar }) => {

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => {
        return (
          <Grid item xs={12} sm="auto"className={classes.gridItem} key={post.id}>
            {/* <div className="flatpin">&nbsp;</div> */}
            <i className="pin" />
            { name ? (
              <Cards post={post} name={name} avatar={avatar} />
            ) : (
              <Cards post={post} />
            )}
          </Grid>
        )
      })}
    </Grid>
  )
}

CardContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardContainer)
