import React from 'react';
import { Select } from 'antd'

const Filter = ({ tags, handleFilter, filters }) => {

  return (
    <div id='filter-container'>
      <div className='filter'>
        <Select
          mode="multiple"
          placeholder="Filter"
          value={filters}
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
          onChange={console.log}
          placeholder='Sort By'
          style={{ width: '100%' }}

        >
          <Select.Option value='recent'>
            Recent
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
