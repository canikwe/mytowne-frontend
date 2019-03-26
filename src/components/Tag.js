import React from 'react'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  chip: {
    MinWidth: '1vw',
    HorizontalAlignment: 'Center',
  },
})

const Tag = (props) => {

  const { classes, tag } = props
  console.log(tag)
  return (
    <Chip
      label={tag.tag_name}
      className={classes.chip}
    />
  )
}

export default withStyles(styles)(Tag)
