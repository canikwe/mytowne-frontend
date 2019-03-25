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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddComment from '@material-ui/icons/AddComment'
import Tag from './Tag'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const styles = theme => ({
  card: {
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
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
    width: 60,
    height: 60,
  },
  tags: {
    marginTop: theme.spacing.unit,
  },
  header: {

  },
  content: {

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

  parseDate = (dateStr) => {
    let date = dateStr.split('T')[0].split('-')
    return date[1] + '-' + date[2] + '-' + date[0]
  }

  render() {
    const { classes, post } = this.props

    return (
      <Card className={classes.card}>
        {post.user ? (
          <CardHeader
            avatar={
              <Avatar alt={post.user.name} src={post.user.avatar} className={classes.avatar} />
            }
            // triple dot menu if we want it
            // action={
            //   <IconButton>
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={<Link to={`/posts/${post.id}`}>{post.title.substring(0, 25) + '...'}</Link>}
            className={classes.header}
            subheader={
              this.parseDate(post.created_at)
            }
          />
        ) : (
          <CardHeader
            avatar={
              <Avatar alt={this.props.name} src={this.props.avatar} className={classes.avatar} />
            }
            // triple dot menu if we want it
            // action={
            //   <IconButton>
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={post.title.substring(0, 25) + '...'}

            subheader={
              this.parseDate(post.created_at)
            }
          />
        )}

        <CardMedia
          className={classes.media}
          image={post.img}
          title="post image"
        />

        <CardContent className={classes.content}>
          <Typography component="p">
            {post.content.substring(0, 55) + '...'}
          </Typography>

          <div className={classes.tags}>
            {post.post_tags.map((tag) => {
              return <Tag tag={tag} key={tag.id} />
            })}
          </div>

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
