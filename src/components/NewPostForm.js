import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import NewPostLabels from './NewPostLabels';

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



class OutlinedTextFields extends React.PureComponent {

  render() {
    const { classes, title, content, img, postTags, handleChange } = this.props;

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
          helperText="hello"
          variant="outlined"
          fullWidth
        />

 
        <TextField
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="outlined-name"
          label="Image"
          className={classes.textField}
          value={img}
          onChange={handleChange('img')}
          margin="normal"
          variant="outlined"
        />

        <NewPostLabels postTags={postTags} handleChange={handleChange}/>

      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
