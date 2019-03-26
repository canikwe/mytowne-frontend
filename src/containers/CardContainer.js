import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../components/Cards'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import '../Cards.css'

const styles = theme => ({
  gridItem: {
    position: 'relative',
    padding: theme.spacing.unit,
  },
})

const CardContainer = (props) => {
  const{ classes, posts } = props

  return (
    <Grid container>
      {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => {
        return (
          <Grid item xs={12} sm={4} className={classes.gridItem} key={post.id}>
            {/* <div className="flatpin">&nbsp;</div> */}
            <i className="pin" />
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

CardContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardContainer)
