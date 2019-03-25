import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tag from './Tag'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const PaperSheet = ({ classes, post }) => {
  
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        {post.img !== "" ? 
        <img src={post.img} alt="featured post"/> : null}
        <Typography variant="h5" component="h3">
          {post.title}
         </Typography>
        <Typography component="p">
           {post.content} 
         </Typography>
         <div className={classes.tags}>
            {post.post_tags.map((tag) => {
              return <Tag tag={tag} key={tag.id} />
            })}
          </div>
          <Link to='/'>Home</Link> | <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>

       </Paper>

    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
