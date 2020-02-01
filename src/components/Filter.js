import React from 'react';
import Select from 'react-select';

const Filter = ({ tags, handleFilter, filters }) => {

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
          value={filters}
          onChange={handleFilter('multi')}
          placeholder="Select Tags"
          isMulti
        />
      </div>
    </div>
  )
}

export default Filter
