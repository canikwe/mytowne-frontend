import React from 'react'
import { List, Avatar } from 'antd'

const ActivityFeed = ({ posts }) => {
  return (
    <div className='sidebar'>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={p => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{p.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default ActivityFeed