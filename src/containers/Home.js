import React from 'react'
import Filter from '../components/Filter'
import CardContainer from './CardContainer'

class Home extends React.Component {

  componentDidUpdate(prevProps) {

  }

  render() {
    const{ posts, handleFilter, tags } = this.props
    return (
      <React.Fragment>
        <Filter handleFilter={handleFilter} tags={tags}/>
        <CardContainer posts={posts} />
      </React.Fragment>
    )
  }
}

export default Home
