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

  createPost = data => {
    // fetch(`http://localhost:3000/api/v1/posts/`, {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }).then(res => res.json())
    // .then(post => this.setState({
    //   posts: [...this.state.posts, post]
    // }))
    
    console.log(data)
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post/new" render={() => <NewPost user_id={this.state.user.id} createPost={this.createPost}/>} />
        </Switch>
      </Router>
    );
  }
}

export default App
