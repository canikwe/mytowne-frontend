import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './containers/Home'
import PostFormContainer from './containers/PostFormContainer'
import Profile from './containers/Profile'
import Login from './containers/Login'
import PostShow from './components/PostShow'
import EditProfile from './containers/EditProfile'
import { isEmpty } from 'lodash'
import Fetch from './helper/Fetch'
import './App.css'


class App extends Component {
  constructor(){
    super()
    this.state = this.initialState()
  }

  initialState = () => {
    return ({
      user: {},
      posts: [],
      filters: [],
      allFilters: [],
      tags: [],
      loading: true,
      searchInput: ''
    })
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.fetchPosts()
      this.fetchUser()
      this.fetchTags()
    }
  }

  // Fetch requests
  fetchPosts = () => {
    // fetch(`http://localhost:3000/api/v1/posts`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // })
    // .then(res => res.json())

    // Possible refactor to move all fetch requests to Fetch Class
    Fetch.GET('posts')
    .then(posts => {

      // let filters = []
      // posts.forEach((post) => {
      //   post.post_tags.forEach((post_tag) => {
      //     filters.push(post_tag.tag_name)
      //   })
      // })
      // let unique = [...new Set(filters)]
      // console.log(unique)
      this.setState({
      posts: posts,
      // filters: unique,
      // allFilters: unique,
      loading: false,
      })
    })
  }

  //refactored to use Fetch class
  fetchUser = () => {
    // fetch('http://localhost:3000/api/v1/profile', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // })
    // .then(res => res.json())

    Fetch.GET('profile')
    .then(data => this.setState({ user: data.user }))
  }

  //refactored to use Fetch class
  fetchTags = () => {

    // fetch(`http://localhost:3000/api/v1/tags`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   }
    // })
    //   .then(res => res.json())
    Fetch.GET('tags')
    .then(tags => { 
      tags.sort((a, b) => {
        return a['name'].localeCompare(b['name'])
      })
      
      this.setState({ tags })
    })
  }

  //refactored to use Fetch class
  createPost = (data) => {
    // fetch(`http://localhost:3000/api/v1/posts/`, {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   },
    //   body: JSON.stringify(data)
    // }).then(res => res.json())

    Fetch.POST(data, 'posts')
    .then(post => {
      // console.log(post)
      this.setState({
        posts: [...this.state.posts, post],
        user: {...this.state.user,
        posts: [...this.state.user.posts, post]}
      })
    })
    .then(this.fetchTags())
  }

  // refactored to use Fetch class
  editPost = (data, postId) => {

    // fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
    //   method: "PATCH",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   },
    //   body: JSON.stringify(data)
    // }).then(res => res.json())

    Fetch.PATCH(data, postId, 'posts/')
    .then(post => this.setState({
      featuredPost: post,
      posts: this.state.posts.map(p => p.id === post.id ? post : p)
    }))
    .then(this.fetchTags())
  }

  // refactored to use Fetch class
  deletePost = (id) => {
    // fetch(`http://localhost:3000/api/v1/posts/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   }
    // }).then(res => res.json())

    Fetch.DELETE(id, 'posts/')
    .then(post => this.setState({ posts: this.state.posts.filter(p => p.id !== post.id) }))
  }

  // refactored to use Fetch class
  editUser = (data, userId) => {

    // fetch(`http://localhost:3000/api/v1/users/${userId}`, {
    //   method: "PATCH",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   },
    //   body: JSON.stringify(data)
    // }).then(res => res.json())

    Fetch.PATCH(data, userId, 'users/')
    .then(user => this.setState({ user }))
    .then(window.alert('Your changes have been saved!'))
  }

  // refactored to use Fetch class
  deleteUser = (id) => {
    // fetch(`http://localhost:3000/api/v1/users/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   }
    // })

    Fetch.DELETE(id, 'users/')
    // .then(res => res.json())
    .then(this.handleLogout)
  }

  //Converting the filter array to tag names and setting state
  handleFilter = (filterArr) => {
    let vals = []
    filterArr.forEach(category => vals.push(category.value))
    this.setState({ filters: vals })
  }
  
  //Filtering POSTS
  handleTagFilter = () => {
    const tagFilter = []
    
    if (this.state.filters.length > 0) {
      this.state.posts.forEach(post => {
        const tagCheck = []
        const tags = post.post_tags.map(t => t.tag_name) // map all tag names to an unnested array
  
        this.state.filters.forEach(f => { // check to see if the filter tag is included in the post's tags
          tags.includes(f) ? tagCheck.push(true) : tagCheck.push(false)
        })
  
        return tagCheck.includes(false) ? null : tagFilter.push(post) // only include post if all filter tags are present
      })
      return tagFilter
    } else {
      return this.state.posts
    } 
  }
  
  // Check for searchTerm
  displayPosts = () => {
    return this.handleTagFilter().filter(p => p.title.toLowerCase().includes(this.state.searchInput.toLowerCase())) 

    // return this.state.posts.filter((post) => {
    //   return post.post_tags.some(r => this.state.filters.includes(r.tag_name))
    // }).filter(p => p.title.toLowerCase().includes(this.state.searchInput.toLowerCase()))
  }

  //Adds values and labels to the featured post object so the tags render correctly in the edit form
  formatFeaturedPost = (post) => {
    let formatedPostTags

    if (post.id !== undefined) {
      formatedPostTags = post.post_tags.map(t => ({...t, label: t.tag_name, value: t.tag_id}))
    }
    return {...post, post_tags: formatedPostTags}
  }

  handleSearch = (e) => this.setState({ searchInput: e.target.value })

  // refactor to reuse Fetch.POST function
  handleLogin = (data) => {
    // fetch(`http://localhost:3000/api/v1/login`, {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(res => res.json())

    Fetch.POST(data, 'login')
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        localStorage.setItem('token', data.jwt)
        // this.fetchUser(data.jwt) // Why do a second fetch request for the user when they are already returned in the response? 

        this.setState({ user: data.user })
        this.fetchPosts(data.jwt)
        this.fetchTags()
      }
    })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState(this.initialState())
  }

  render() {
    return (
      <React.Fragment>
        <Nav
          handleSearch={this.handleSearch}
          searchInput={this.state.searchInput}
          handleLogout={this.handleLogout}
          loggedIn={isEmpty(this.state.user) ? false : true}
          user={this.state.user}
        />
        <Switch>
          <Route exact path="/login" render={() => {
            return !localStorage.token && isEmpty(this.state.user) ? <Login handleLogin={this.handleLogin}/> :
            <Redirect to="/" />
          }} />

          <Route exact path="/" render={() => {
            return !localStorage.token && isEmpty(this.state.user) ? <Redirect to="/login" /> :
            <Home posts={this.displayPosts()} tags={this.state.tags} handleFilter={this.handleFilter} />
          }} />

          <Route exact path="/posts/new" render={() => {
            return isEmpty(this.state.user) ? <Redirect to="/login" /> :
            <PostFormContainer name={"New Post"} user_id={this.state.user.id} handleSubmit={this.createPost} handleSave={this.saveDraft} tags={this.state.tags} post={{}}/>
          }} />

          {/* Unsure how to authenticate this */}
          <Route exact path="/posts/:id/edit" render={props => {
            let postId = props.match.params.id
            let post = this.state.posts.find(p => p.id === parseInt(postId))

            return this.state.loading ? null : (
              <PostFormContainer name={"Edit Post"} user_id={this.state.user.id} handleSubmit={this.editPost} handleSave={this.saveDraft} handleDelete={this.deletePost} tags={this.state.tags} post={this.formatFeaturedPost(post)}/>)
          }} />

          {/* Unsure how to authentcate this */}
          <Route exact path="/posts/:id" render={props => {
            console.log(this.state.posts)
            let postId = props.match.params.id
            let post = this.state.posts.find(p => p.id === parseInt(postId))

            return this.state.loading ? null : (
              <PostShow post={post} handleDelete={this.deletePost} user={this.state.user}/>
            )
          }} />

          <Route exact path="/profile" render={() => {
            return isEmpty(this.state.user) ? <Redirect to="/login" /> :
            <Profile user={this.state.user} />
          }} />

          <Route exact path="/profile/edit" render={() => {
            return isEmpty(this.state.user) ? <Redirect to="/login" /> :
            <EditProfile user={this.state.user} editUser={this.editUser} deleteUser={this.deleteUser} />
          }} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App
