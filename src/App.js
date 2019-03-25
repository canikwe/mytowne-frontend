import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './containers/Home'
import PostFormContainer from './containers/PostFormContainer'
import TestIndex from './components/TestIndex'
import './App.css'
import Profile from './containers/Profile'
<<<<<<< HEAD
import Login from './containers/Login'
=======
import PostShow from './components/PostShow'
>>>>>>> post_show_page

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
      posts: [],
      featuredPost: {},
<<<<<<< HEAD
      filters: [],
      allFilters: []
=======
      loading: true
>>>>>>> post_show_page
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
<<<<<<< HEAD
      featuredPost: posts.slice(-1)[0],
      filters: unique,
      allFilters: unique
      })
    })
=======
      loading: false,
      featuredPost: posts.slice(-1)[0]
    })})
>>>>>>> post_show_page

    //setting default user for development until Auth in implemented
    fetch(`http://localhost:3000/api/v1/users/1`)
    .then(res => res.json())
<<<<<<< HEAD
    .then(user => this.setState({user}))
=======
    .then(user => this.setState({user: user}, () => console.log(this.state.user)))
>>>>>>> post_show_page
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

  editPost = (data, postId) => {
    fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
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

  deletePost = (id) => {
    fetch(`http://localhost:3000/api/v1/posts/${id}`, {
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
  formatFeaturedPost(post) {
    let formatedPostTags

    if (post.id !== undefined) {
      formatedPostTags = post.post_tags.map(t => ({...t, label: t.tag_name, value: t.tag_id}))
    }
    return {...post, post_tags: formatedPostTags}
  }

  //OnClick handler to update the featured post
  updateFeaturedPost = post => {
    this.setState({featuredPost: post}, () => <PostShow post={this.state.featuredPost} />)
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
          <Route exact path="/posts/:id/edit" render={props => {
            let postId = props.match.params.id
            let post = this.state.posts.find(p => p.id === parseInt(postId))

            return this.state.loading ? null : (
            <PostFormContainer name={"Edit Post"} user_id={this.state.user.id} handleSubmit={this.editPost} handleSave={this.saveDraft} handleDelete={this.deletePost} post={this.formatFeaturedPost(post)}/>)
            }} />
          <Route exact path="/posts/:id" render={props => {
            console.log(this.state.posts)
            let postId = props.match.params.id            
            let post = this.state.posts.find(p => p.id === parseInt(postId))
            
            console.log("post exists?", post)
            return this.state.loading ? null : (
              <PostShow post={post}
              />
            )
          }}/>
          <Route exact path="/profile" render={() => <Profile user={this.state.user} />} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App
