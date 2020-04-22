import React, { PureComponent } from 'react'
import { Form, Input, Button } from 'antd'
 
class CommentEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleTextSubmit = () => {
    const { submitCommentText } = this.props
    const { value } = this.state

    submitCommentText(value)
    this.setState({ value: '' })
  }

  render() {
    const { submitting } = this.props
    const { value } = this.state
    
    return (
      <div>
        <Form.Item>
          <Input.TextArea rows={4} onChange={this.handleChange} value={value} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={submitting} onClick={this.handleTextSubmit} type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </div>
    )
  }
}

export default CommentEditor