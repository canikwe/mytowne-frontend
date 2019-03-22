import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './containers/Home'
import NewPost from './containers/NewPost'
import './App.css'

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
      posts: []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/posts`)
    .then(res => res.json())
    .then(posts => this.setState({posts}))

    fetch(`http://localhost:3000/api/v1/users/1`)
    .then(res => res.json())
    .then(user => this.setState({user}))
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post/new" component={NewPost} />
        </Switch>
      </Router>
    );
  }
}

export default App
