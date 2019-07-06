import React from 'react'

const Tag = props => {
  const { tag } = props
  return (
    <span className='tag'> {tag.tag_name} </span>
  )
}

export default Tag