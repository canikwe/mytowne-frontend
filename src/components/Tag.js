import React from 'react'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  chip: {
    MinWidth: '1vw',
    HorizontalAlignment: 'Center',
  },
})

const Tag = (props) => {

  const { classes, tag } = props
  return (
    <Chip
      label={tag.tag_name}
      className={classes.chip}
    />
  )
}

export default withStyles(styles)(Tag)
