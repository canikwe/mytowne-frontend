import React from 'react'
import Filter from '../components/Filter'
import CardContainer from './CardContainer'

class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      filter: ""
    }
  }

  render() {
    return (
      <React.Fragment>
        <Filter />
        <CardContainer />
      </React.Fragment>
    )
  }

  }

export default Home
