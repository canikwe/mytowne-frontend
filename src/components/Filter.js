import React, { PureComponent } from 'react';
import { Select, Radio, Input, Modal, Icon } from 'antd'

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

  handleLocalSort = e => this.setState({filters: { ...this.state.filters, sort: e.target.value }})

  // handleLocalDirection = e => this.setState({filters: { ...this.state.filters, direction: e.target.value }})

  submitFilters = () => {
    this.props.handleFilters(this.state.filters)
    this.handleToggle()
  }

  clearFilters = () => this.setState({filters: {tags: [], sort: ''}})

  render() {
    const { tags, searchInput } = this.props
    const { advancedFilters, filters } = this.state
    
    return (
      <div id='filter-container'>
        <h2>Community Board</h2>
        <div className='search-bar'>
          <Input 
            value={searchInput} 
            onChange={this.updateSearchInput}
            placeholder='Search...'
            allowClear 
            style={{textAlign: 'center'}}
          />
        </div>
        <Icon type='filter' onClick={this.handleToggle} style={{fontSize: '1.75em'}}/>
        <Modal
          visible={advancedFilters}
          onCancel={this.handleToggle}
          footer={[
            <Icon key="reset" type='undo' onClick={this.clearFilters} style={{fontSize: '1.5em', color: 'grey', marginRight: '10px'}}/>,
            <Icon key="submit" type="check-circle" onClick={this.submitFilters} style={{ fontSize: '1.5em', color: 'rgb(0, 200, 0)'}}/>,
          ]}
        >
          <div className='advanced-filter-container'>

            <div className='filter'>
              <h3>Filters:</h3>
              <Select
                mode="multiple"
                placeholder="e.g. General, For Sale, etc..."
                value={filters.tags}
                onChange={this.handleLocalFilters}
                style={{ width: '100%', height: '100%' }}
              >
                {tags.map(tag => (
                  <Select.Option key={tag.id} value={tag.name}>
                    {tag.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className='vl'></div>

            <div className='sort'>
              <h3>Sort:</h3>
              <Radio.Group 
                className='sort-btns'
                onChange={this.handleLocalSort} value={filters.sort}>
                <Radio value='new'>Newest</Radio>
                <Radio value='old'>Oldest</Radio>
                <Radio value='most'>Most Popular</Radio>
                <Radio value='least'>Least Popular</Radio>
              </Radio.Group>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Filter
