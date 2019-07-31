import React, { PureComponent } from 'react';
import Select from 'react-select';

class Filter extends PureComponent {
  state = {
    multi: null,
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    }, () => this.props.handleFilter(this.state.multi))
  };

  render() {
    const { tags } = this.props;

    const formattedTags = tags.map(tag => ({
      value: tag.name,
      label: tag.name
      })
    )

    return (
      <Select
        textFieldProps={{
          label: 'Filter By Category',
          InputLabelProps: {
            shrink: true,
          },
        }}
        options={formattedTags}
        value={this.state.multi}
        onChange={this.handleChange('multi')}
        placeholder="Select Categories"
        isMulti
      />
    )
  }
}

export default Filter
