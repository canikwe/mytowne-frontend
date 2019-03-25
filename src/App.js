import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './containers/Home'
import PostFormContainer from './containers/PostFormContainer'
import TestIndex from './components/TestIndex'
import './App.css'
import Profile from './containers/Profile'
import Login from './containers/Login'

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
      posts: [],
      featuredPost: {},
      filters: [],
      allFilters: []
    }
  }

  //Fetch requests
  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/posts`)
    .then(res => res.json())
    .then(posts => {

      //hardcoded featured post for development
      let filters = []
      posts.forEach((post) => {
        post.post_tags.forEach((post_tag) => {
          filters.push(post_tag.tag_name)
        })
      })
      let unique = [...new Set(filters)]
      console.log(unique)
      this.setState({
      posts: posts,
      featuredPost: posts.slice(-1)[0],
      filters: unique,
      allFilters: unique
      })
    })

    //setting default user for development until Auth in implemented
    fetch(`http://localhost:3000/api/v1/users/1`)
    .then(res => res.json())
    .then(user => this.setState({user}))
  }

  createPost = data => {
    fetch(`http://localhost:3000/api/v1/posts/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(post => this.setState({
      posts: [...this.state.posts, post]
    }))
  }

  editPost = data => {
    fetch(`http://localhost:3000/api/v1/posts/${this.state.featuredPost.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(post => this.setState({
      featuredPost: post,
      posts: this.state.posts.map(p => p.id === post.id ? post : p)
    }))
  }

  deletePost = () => {
    fetch(`http://localhost:3000/api/v1/posts/${this.state.featuredPost.id}`, {
      method: "DELETE"
    }).then(res => res.json())
    .then(post => this.setState({posts: this.state.posts.filter(p => p.id !== post.id)}))
  }

  //Filtering POSTS
  handleFilter = (filterArr) => {
    if (filterArr.length === 0) {
      this.setState({
        filters: this.state.allFilters
      })
    } else {
      let vals = []
      filterArr.forEach(category => {
        vals.push(category.value)
      })
      this.setState({
        filters: vals
      })
    }
  }

  displayPosts = () => {
    return this.state.posts.filter((post) => {
      return post.post_tags.some(r => this.state.filters.includes(r.tag_name))
    })
  }

  //Adds values and labels to the featured post object so the tags render correctly in the edit form
  formatFeaturedPost() {
    let formatedPostTags

    if (this.state.featuredPost.id !== undefined) {
      formatedPostTags = this.state.featuredPost.post_tags.map(t => ({...t, label: t.tag_name, value: t.tag_id}))
    }
    return {...this.state.featuredPost, post_tags: formatedPostTags}
  }

  //OnClick handler to update the featured post
  updateFeaturedPost = post => {
    this.setState({featuredPost: post})
  }

  //Possible feature to save posts before publishing them??
  saveDraft = post => {
    this.setState({posts: [...this.state.posts, post]})
    console.log(post)
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Home posts={this.displayPosts()} handleFilter={this.handleFilter} />} />
          <Route exact path="/posts/new" render={() => <PostFormContainer name={"New Post"} user_id={this.state.user.id} handleSubmit={this.createPost} handleSave={this.saveDraft} post={{}}/>} />
          <Route exact path="/testing_post_index" render={() => <TestIndex posts={this.state.posts} handleClick={this.updateFeaturedPost} handleDelete={this.deletePost}/>} />
          <Route exact path="/posts/edit" render={() => <PostFormContainer name={"Edit Post"}user_id={this.state.user.id} handleSubmit={this.editPost} handleSave={this.saveDraft} handleDelete={this.deletePost} post={this.formatFeaturedPost()}/>} />
          <Route exact path="/profile" render={() => <Profile user={this.state.user} />} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App
