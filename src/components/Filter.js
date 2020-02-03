import React from 'react';
import { Select, Radio } from 'antd'

const Filter = ({ tags, handleFilter, filters, handleSort, handleDirection }) => {

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
          value={filters.sort}
        >
          <Select.Option value='likes'>
            Likes
          </Select.Option>
          <Select.Option value=''>
            Most Recent
          </Select.Option>
          <Select.Option value='alpha'>
            Title
          </Select.Option>
        </Select>
      </div>
      <div className='direction'>
        <Radio.Group onChange={handleDirection} value={filters.direction}>
          <Radio value='asc'>Ascending</Radio>
          <Radio value='desc'>Descending</Radio>
        </Radio.Group>
      </div>
    </div>
  )
}

export default Filter
