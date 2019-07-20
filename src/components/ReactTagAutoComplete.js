import React, { PureComponent } from 'react'
import ReactTags from 'react-tag-autocomplete'
import Tags from '../components/displayTags'


class TagContainer extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      tags: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Pears" }
      ],
      // suggestions: [
      //   { id: 3, name: "Bananas" },
      //   { id: 4, name: "Mangos" },
      //   { id: 5, name: "Lemons" },
      //   { id: 6, name: "Apricots" }
      // ]
    }
  }




  render() {
    console.log(this.props)
    const { tags, tagSuggestions, handleTagDelete, handleTagAddition } = this.props
    return(
      <ReactTags
        allowNew
        tags={tags}
        suggestions={tagSuggestions}
        handleDelete={handleTagDelete}
        handleAddition={handleTagAddition} />
    )
  }
}

export default TagContainer