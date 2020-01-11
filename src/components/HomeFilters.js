import React from 'react'
import { Tabs } from 'antd'

const HomeFilters = props => {
  return (
    <Tabs onChange={props.handleTabChange}>
      <Tabs.TabPane tab="Feed" key='following'>

      </Tabs.TabPane>
      <Tabs.TabPane tab="Recent" key='recent'>

      </Tabs.TabPane>
    </Tabs>
  )
}

export default HomeFilters