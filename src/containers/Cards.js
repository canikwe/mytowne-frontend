import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import AddComment from '@material-ui/icons/AddComment'
import Tag from '../components/Tag'
import { Link } from "react-router-dom";
// import Divider from '@material-ui/core/Divider';
import AvImg from '../images/avatar_placeholder.png'
import moment from 'moment'


const styles = theme => ({
  card: {
    width: 250,
    height: 330,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 0,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex'
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
    width: 40,
    height: 40,
  },
  tags: {
    padding: '5px',
    display: 'flex',
    alignItems: 'flex-end',
    borderTop: '1px solid lightgrey'
  },
  header: {

  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%'
  },
});

class Cards extends PureComponent {
  state = {
    expanded: false
  }

  handleExpandClick = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }


  render() {
    // console.log(this.props)
    const { classes, post } = this.props
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={post.img === "" ? 'https://imbindonesia.com/images/placeholder/camera.jpg' : post.img}
          title={post.title + " - image"}
        />
        <CardActionArea component={ Link } to={`/posts/${post.id}`} className={classes.content}>

        {post.user ? (
          <CardHeader
            avatar={ post.user.avatar !== '' ?
              <Avatar alt={post.user.name} src={post.user.avatar} className={classes.avatar} />
              :
              <Avatar alt={post.user.name} className={classes.avatar}>{post.user.name.slice(0, 1)}</Avatar>
            }
            // triple dot menu if we want it
            // action={
            //   <IconButton>
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={post.title}
            className={classes.header}
            subheader={
              moment(post.created_at).calendar()
            }
          />
        ) : (
          <CardHeader
            avatar={
              <Avatar alt={this.props.name} src={this.props.avatar !== '' ? this.props.avatar : AvImg} className={classes.avatar} />
            }
            // triple dot menu if we want it
            // action={
            //   <IconButton>
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={post.title}

            subheader={
              moment(post.created_at).calendar()
            }
          />
        )}
    </CardActionArea>


        {/* <CardContent className={classes.content}> */}
          {/* <Typography component="p">
            {post.content.substring(0, 55) + '...'}
          </Typography> */}
          
          {/* <Divider /> */}
          <div className={classes.tags}>
            {post.post_tags.map((tag) => {
              return <Tag tag={tag} key={tag.id} />
            })}
          </div>

        {/* </CardContent> */}
{/* 
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
        </Collapse> */}

      </Card>
    )
  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Cards)
