import React, { PureComponent } from 'react';
import { Select, Radio, Input, Modal, Button } from 'antd'

class Filter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      advancedFilters: false,
      filters: props.filters,
    }
  }

  updateSearchInput = e => this.props.handleSearch(e.target.value)

  handleToggle = () => this.setState({ advancedFilters: !this.state.advancedFilters, filters: this.props.filters })

  handleLocalFilters = tags => this.setState({filters: { ...this.state.filters, tags }}) 

  handleLocalSort = sort => this.setState({filters: { ...this.state.filters, sort }})

  handleLocalDirection = e => this.setState({filters: { ...this.state.filters, direction: e.target.value }})

  submitFilters = () => {
    this.props.handleFilters(this.state.filters)
    this.handleToggle()
  }

  clearFilters = () => this.setState({filters: {tags: [], direction: 'asc', sort: ''}})

  render() {
    const { tags, searchInput } = this.props
    const { advancedFilters, filters } = this.state
    
    return (
      <div id='filter-container'>
        <h3>Community Board</h3>
        <div className='search-bar'>
          <Input value={searchInput} onChange={this.updateSearchInput} allowClear />
        </div>
        <h2 onClick={this.handleToggle}>FLTERS</h2>
        <Modal
          visible={advancedFilters}
          onCancel={this.handleToggle}
          footer={[
            <Button key="clear" onClick={this.clearFilters}>
              Clear Settings
            </Button>,
            <Button key="submit" type="primary" onClick={this.submitFilters}>
              Submit
            </Button>,
          ]}
          >
        <div className='filter'>
          <Select
            mode="multiple"
            placeholder="Filter"
            value={filters.tags}
            onChange={this.handleLocalFilters}
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
            onChange={this.handleLocalSort}
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
          <Radio.Group onChange={this.handleLocalDirection} value={filters.direction}>
            <Radio value='asc'>Ascending</Radio>
            <Radio value='desc'>Descending</Radio>
          </Radio.Group>
        </div>

          Hello World</Modal>
      </div>
    )
  }
}

export default Filter
