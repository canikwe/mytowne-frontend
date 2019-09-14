import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { isEmpty } from 'lodash'
import Login from './containers/Login'
import Home from './components/Home'
import PostShow from './containers/PostShow'
import PostFormContainer from './containers/PostFormContainer'
import Profile from './components/Profile'
import EditProfile from './containers/EditProfile'
import Fetch from './helper/Fetch'
import NavBar from './containers/NavigationBar'
import Footer from './components/Footer'
import Loading from './components/Loading'
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
      searchInput: '',
      page: 'login'
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

  fetchPosts = () => {
    Fetch.GET('posts')
    .then(posts => {
      this.setState({
      posts: posts,
      loading: false
      })
    })
  }

  fetchUser = () => {
    Fetch.GET('profile')
    .then(data => this.setState({ user: data.user, page: 'homepage' }))
  }

  fetchTags = () => {
    Fetch.GET('tags')
    .then(tags => { 
      tags.sort((a, b) => {
        return a['name'].localeCompare(b['name'])
      })
      this.setState({ tags })
    })
  }

  // compare post.tags from returned DB post object with tags stored in state to add new tags to state without an additional DB fetch call
  addNewTags = (postTags) => {
    let tags = [...this.state.tags]
    postTags.forEach(pt => {
      const newTag = tags.find(tag => tag.id === pt.tag_id)
      return newTag === undefined ? tags = [...tags, {id: pt.tag_id, name: pt.tag_name}] : tags
    })
    return tags
  }

  createPost = data => {
    Fetch.POST(data, 'posts')
    .then(post => {
      const tags = this.addNewTags(post.tags)
      this.setState({
        posts: [...this.state.posts, post],
        tags: tags
      })
    })
  }

    //Like Posts
  addLike = (likeData) => {
    Fetch.POST(likeData, 'likes')
    .then(res => {
      const post = res.post

      this.setState({
        posts: this.state.posts.map(p => p.id === post.id ? post : p)
      })
    })
    .catch(error => {debugger})
  }

  removeLike = (id) => {
    Fetch.DELETE(id, 'likes/')
    .then(post => {
      this.setState({
        posts: this.state.posts.map(p => p.id === post.id ? post : p)
      })
    })
  }
  
  editPost = (data, post) => {
    Fetch.PATCH(data, post.id, 'posts/')
    .then(resp => {
      const { post, tags } = resp
      
      this.setState({
      posts: this.state.posts.map(p => p.id === post.id ? post : p),
      tags: tags
      })
    })
  }

  deletePost = (id) => {
    Fetch.DELETE(id, 'posts/')
    .then(post => {
      this.setState({ posts: this.state.posts.filter(p => p.id !== id) })})
  }

  editUser = (data, userId) => {
    Fetch.PATCH(data, userId, 'users/')
    .then(user => this.setState({ user }))
    .then(window.alert('Your changes have been saved!'))
    .then(window.history.back())
  }

  deleteUser = (id) => {
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
        const tags = post.tags.map(t => t.name) // map all tag names to an unnested array
  
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
  }

  handleSearch = (e) => this.setState({ searchInput: e.target.value })

  handleLogin = (data) => {
    Fetch.POST(data, 'login')
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        localStorage.setItem('token', data.jwt)
        this.setState({ user: data.user, page: 'homepage' })
        this.fetchPosts(data.jwt)
        this.fetchTags()
      }
    })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState(this.initialState())
  }

  userPosts = (user) => {
    return this.state.posts.filter(p => p.user.id === user.id)
  }

  render() {
    return (
      <div id='main' className={this.state.page}>
        <NavBar 
          handleLogout={this.handleLogout} 
          loggedIn={!isEmpty(this.state.user)} 
          handleSearch={this.handleSearch}
          searchInput={this.state.searchInput}
          userId={this.state.user.id}
          />
        <Switch>
          <Route exact path="/login" render={() => {
            return isEmpty(this.state.user) && !localStorage.token ? <Login handleLogin={this.handleLogin}/> :
            <Redirect to="/" />
          }} />

          <Route exact path="/" render={() => {
            return isEmpty(this.state.user) && !localStorage.token ? <Redirect to="/login" /> :
            <Home posts={this.displayPosts()} tags={this.state.tags} handleFilter={this.handleFilter} addLike={this.addLike} removeLike={this.removeLike} user={this.state.user} />
          }} />

          <Route exact path="/posts/new" render={() => {
            return this.state.loading ? <Loading /> :
            <PostFormContainer name={"New Post"} user_id={this.state.user.id} handleSubmit={this.createPost} tags={this.state.tags} post={{}}/>
          }} />

          {/* Unsure how to authenticate this */}
          <Route exact path="/posts/:id/edit" render={props => {
            let postId = props.match.params.id
            let post = this.state.posts.find(p => p.id === parseInt(postId))
            
            return this.state.loading ? <Loading /> : (
              <PostFormContainer name={"Edit Post"} user_id={this.state.user.id} handleSubmit={this.editPost} handleDelete={this.deletePost} handleNewTags={this.handleNewTags} tags={this.state.tags} post={post} />)
          }} />

          {/* Unsure how to authentcate this */}
          <Route exact path="/posts/:id" render={props => {
            let postId = props.match.params.id
            let post = this.state.posts.find(p => p.id === parseInt(postId))

            return this.state.loading ? <Loading /> : (
              <PostShow post={post} handleDelete={this.deletePost} user={this.state.user}/>
            )
          }} />

          <Route exact path="/profile/edit" render={() => {
            return this.state.loading ? <Loading /> :
            <EditProfile user={this.state.user} editUser={this.editUser} deleteUser={this.deleteUser} />
          }} />

          <Route exact path="/profile/:id" render={() => {
            return this.state.loading ? <Loading /> :
            <Profile addLike={this.addLike} removeLike={this.removeLike} currentUser={this.state.user} />
          }} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App
