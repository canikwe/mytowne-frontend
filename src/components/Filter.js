import React from 'react';
import { Select } from 'antd'

const Filter = ({ tags, handleFilter, filters, handleSort }) => {

  return (
    <div id='filter-container'>
      <div className='filter'>
        <Select
          mode="multiple"
          placeholder="Filter"
          value={filters.tags}
          onChange={handleFilter}
          style={{ width: '100%' }}
        >
          {tags.map(tag => (
            <Select.Option key={tag.name} value={tag.name}>
              {tag.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className='sort'>
        <Select
          onChange={handleSort}
          placeholder='Sort By'
          style={{ width: '100%' }}
        >
          <Select.Option value=''>
            None
          </Select.Option>
          <Select.Option value='likes'>
            Likes
          </Select.Option>
          <Select.Option value='date'>
            Date
          </Select.Option>
          <Select.Option value='alpha'>
            Alpha
          </Select.Option>
        </Select>
      </div>
    </div>
  )
}

export default Filter
