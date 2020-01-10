import React from 'react'
import { Tabs } from 'antd'

const HomeFilters = props => {
  return (
    <Tabs onChange={props.handleTabChange}>
      <Tabs.TabPane tab="Following" key='following'>

      </Tabs.TabPane>
      <Tabs.TabPane tab="Favorites" key='favorites'>

      </Tabs.TabPane>
    </Tabs>
  )
}

export default HomeFilters