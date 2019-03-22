import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddComment from '@material-ui/icons/AddComment'
import Tag from './Tag'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Cards extends React.Component {
  state = {
    expanded: false
  }

  handleExpandClick = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  render() {
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="blank" className={classes.avatar}>
              R
            </Avatar>
          }
          // triple dot menu if we want it
          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title="Post Title"
          subheader="The date if we want"
        />

        <CardMedia
          className={classes.media}
          image="https://cdn4.iconfinder.com/data/icons/oakcons-2/16/Image-512.png"
          title="placeholder"
        />

        <CardContent>
          <Typography component="p">
            This is a super interesting post about something going on in my community!
          </Typography>

          <Tag />

        </CardContent>

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <AddComment />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>

            <Typography paragraph>Comments:</Typography>
            <Typography paragraph>
              Comments could all go down here.
            </Typography>

            <Typography paragraph>
              Comment
            </Typography>

            <Typography paragraph>
              Comment
            </Typography>

            <Typography>
              Another Comment Here
            </Typography>
          </CardContent>
        </Collapse>

      </Card>
      )
    }
  }

Cards.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Cards)
