import React from 'react'
import { List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, MessageOutlined } from '@ant-design/icons'
// import Card from '../containers/Card'
import { replaceMissingImg, displayPostDate } from '../helper/functions'

const PostFeed = ({ posts, loading }) => {
  const loadingPosts = () => [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  
  return (
    <div className='posts'>
      <List
        itemLayout="vertical"
        loading={loading}
        size="medium"
        pagination={{
          onChange: page => {
            // console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={posts}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <span>
                <HeartOutlined />
                {item.likes.length}
              </span>,
              <span>
                <MessageOutlined />
                {item.comments.length}
              </span>
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={item.img}
                onError={replaceMissingImg}
                className='another-card'
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.user.avatar} />}
              title={<Link to={`posts/${item.id}`}>{item.title}</Link>}
              description={displayPostDate(item.created_at)}
            />
            {item.content.split(' ').slice(0, 75).join(' ')}
          </List.Item>
        )}
      />
        
    </div>
  )
}

export default PostFeed