import React from 'react'
import ReactTags from 'react-tag-autocomplete'

const TagsContainer = ({ tags, tagSuggestions, handleTagDelete, handleTagAddition }) => {
  return(
    <ReactTags
      allowNew
      tags={tags}
      suggestions={tagSuggestions}
      handleDelete={handleTagDelete}
      handleAddition={handleTagAddition}
      classNames={{root: 'react-tags tag-input'}}
    />
  )
}

export default TagsContainer