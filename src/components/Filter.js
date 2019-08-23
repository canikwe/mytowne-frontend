import React, { PureComponent } from 'react';
import Select from 'react-select';

class Filter extends PureComponent {
  constructor(){
    super()
    this.state = {
      multi: null,
    }
  }

  handleChange = name => value => {
    this.setState({
      [name]: value,
    }, () => this.props.handleFilter(this.state.multi))
  }

  render() {
    const { tags } = this.props;

    const formattedTags = tags.map(tag => ({
      value: tag.name,
      label: tag.name
      })
    )

    return (
      <div id='filter-container'>
        <div className='filter'>
          <Select
            textFieldProps={{
              label: 'Filter By Tags',
              InputLabelProps: {
                shrink: true,
              },
            }}
            options={formattedTags}
            value={this.state.multi}
            onChange={this.handleChange('multi')}
            placeholder="Select Tags"
            isMulti
          />
        </div>
      </div>
    )
  }
}

export default Filter
