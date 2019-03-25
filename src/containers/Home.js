import React from 'react'
import Filter from '../components/Filter'
import CardContainer from './CardContainer'

class Home extends React.Component {

  componentDidUpdate(prevProps) {

  }

  render() {
    const{ posts } = this.props
    return (
      <React.Fragment>
        <Filter handleFilter={this.props.handleFilter} />
        <CardContainer posts={posts} />
      </React.Fragment>
    )
  }
}

export default Home
