import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// import PostTags from './PostTags';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const PostForm = ({ classes, title, content, img, handleChange }) => {

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Title"
        className={classes.textField}
        value={title}
        onChange={handleChange('title')}
        margin="normal"
        variant="outlined"
        inputProps={{maxLength: 40}}
        fullWidth
      />

      <TextField
        id="outlined-multiline-flexible"
        label="Content"
        multiline
        rows="10"
        value={content}
        onChange={handleChange('content')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        fullWidth
      />

      <TextField
        id="outlined-name"
        label="Image"
        className={classes.textField}
        value={img}
        onChange={handleChange('img')}
        margin="normal"
        variant="outlined"
        fullWidth
      />

    </form>
  );

}

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostForm);
