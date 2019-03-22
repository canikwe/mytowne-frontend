import React from 'react'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  chip: {
    marginRight: '0.3%',
    marginTop: '10%',
    MinWidth: '1vw',
    HorizontalAlignment: 'Center',
  },
})

const Tag = (props) => {

  const { classes } = props
  return (
    <Chip
      label="Generally Speaking"
      className={classes.chip}
    />
  )
}

export default withStyles(styles)(Tag)
