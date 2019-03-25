import React from 'react'
import Filter from '../components/Filter'
import CardContainer from './CardContainer'

class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      filter: []
    }
  }

  handleFilter = (value) => {
    console.log(value)
  }

  render() {
    const{ posts } = this.props
    return (
      <React.Fragment>
        <Filter handleFilter={this.handleFilter} />
        <CardContainer posts={posts} />
      </React.Fragment>
    )
  }

  }

export default Home
