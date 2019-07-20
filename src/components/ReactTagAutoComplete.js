import React, { PureComponent } from 'react'
import ReactTags from 'react-tag-autocomplete'

const TagContainer = ({ tags, tagSuggestions, handleTagDelete, handleTagAddition }) => {
  return(
    <ReactTags
      allowNew
      tags={tags}
      suggestions={tagSuggestions}
      handleDelete={handleTagDelete}
      handleAddition={handleTagAddition} />
  )
}

export default TagContainer