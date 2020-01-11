import React from 'react'
import { Form, Input, Card } from 'antd'

const QuickPost = () => {
  return (
    <Card size="small">
      <Form layout="vertical" onSubmit={null}>
        <Form.Item label="New Post...">
          <Input />
        </Form.Item>
        {/* <Form.Item label="Description">
          <Input type="textarea" />
        </Form.Item> */}
      </Form>
    </Card>
  )
}

export default QuickPost