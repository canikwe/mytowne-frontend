import React from 'react'
import { Form, Input, Card } from 'antd'

const QuickPost = ({ submitPost, handleContentChange, content }) => {

  return (
    <Card size="small">
      <Form layout="vertical" onSubmit={submitPost}>
        <Form.Item label="New Post...">
          <Input onChange={handleContentChange} value={ content }/>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default QuickPost