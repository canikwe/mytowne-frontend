import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Modal } from 'antd'
import Login from './containers/Login'
import Home from './containers/Home'
import PostShow from './containers/PostShow'
import PostFormContainer from './containers/PostFormContainer'
import Profile from './components/Profile'
import EditProfile from './containers/EditProfile'
import Fetch from './helper/Fetch'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Index from './components/Index'
// import { Modal, Button } from 'antd'
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
      page: 'login',
      homepageFilter: true
    })
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.fetchUser()
      this.fetchPosts()
      this.fetchTags()
    }
  }

 // -------------------- fetch helper methods -------------------- 

   fetchUser = () => {
    Fetch.GET('profile')
    .then(data => {
      if (data.user) {
        this.setState({ user: data.user, page: 'homepage' })
      } else {
        Modal.error({
          title: 'Trouble logging in',
          content: 'Please try again',
        })
        localStorage.clear()
        return <Redirect to='/login' />
      }
    })
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
      localStorage.clear()
      return <Redirect to='/login' />
    })
  }

  fetchPosts = () => {
    Fetch.GET('posts')
    .then(posts => {
      this.setState({
      posts: posts,
      loading: false
      })
    })
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
    })
  }

  fetchTags = () => {
    Fetch.GET('tags')
    .then(tags => { 
      tags.sort((a, b) => {
        return a['name'].localeCompare(b['name'])
      })
      this.setState({ tags })
    })
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
    })
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
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
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
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
    })
  }

  removeLike = (id) => {
    Fetch.DELETE(id, 'likes/')
    .then(post => {
      this.setState({
        posts: this.state.posts.map(p => p.id === post.id ? post : p)
      })
    })
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
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
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
    })
  }

  deletePost = (id) => {
    Fetch.DELETE(id, 'posts/')
    .then(post => {
      const posts = this.state.posts.filter(p => p.id !== id) 
      this.setState({ posts })
    })
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
    })
  }

  editUser = (data, userId) => {
    Fetch.PATCH(data, userId, 'users/')
    .then(user => this.setState({ user }))
    .then(window.alert('Your changes have been saved!'))
    .then(window.history.back())
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
    })
  }

  deleteUser = (id) => {
    Fetch.DELETE(id, 'users/')
    // .then(res => res.json())
    .then(this.handleLogout)
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
      debugger
    })
  }

  handleLogin = (data) => {
    Fetch.POST(data, 'login')
    .then(data => {
      if (data.error) {
        Modal.error({
          title: data.error,
          content: 'Please try again',
        })
      } else {
        localStorage.setItem('token', data.jwt)
        this.setState({ user: data.user, page: 'homepage' })
        this.fetchPosts(data.jwt)
        this.fetchTags()
      }
    })
    .catch(err => {
      Modal.error({
        title: 'Something went wrong',
        content: err.message,
      })
    })
    
  }

// -------------------- state changing helper methods --------------------

  //Converting the filter array to tag names and setting state
  handleFilter = (filterArr) => {
    let vals = []
    filterArr.forEach(category => vals.push(category.value))
    this.setState({ filters: vals })
  }

  handleSearch = (e) => this.setState({ searchInput: e.target.value })

  handleLogout = () => {
    localStorage.clear()
    this.setState(this.initialState())
  }

  handleTagClick = tag => {
    this.setState({
      filters: [tag.tag_name]
    })
  }

  
// -------------------- presentation/rendering helper methods --------------------
  
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


  // compare post.tags from returned DB post object with tags stored in state to add new tags to state without an additional DB fetch call
  addNewTags = (postTags) => {
    let tags = [...this.state.tags]
    postTags.forEach(pt => {
      const newTag = tags.find(tag => tag.id === pt.tag_id)
      return newTag === undefined ? tags = [...tags, { id: pt.tag_id, name: pt.tag_name }] : tags
    })
    return tags
  }

  userPosts = (user) => {
    return this.state.posts.filter(p => p.user.id === user.id)
  }


  recentPosts = () => {
    return [...this.state.posts].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    }).slice(0, 10)      
  }

// ------------------------ methods to render newsfeed posts ------------------------
  followedPosts = () => {
    const posts = this.state.posts.filter(p => {
      return (p.user.id !== this.state.user.id && p.tags.some(t => {
        // app periodically breaks here...
        if (!this.state.user.followed_tags) {
          return []
        } else {
          return this.state.user.followed_tags.includes(t.id)
        }
      }))
    })

    return posts.sort((a, b) => b.id - a.id)
  }

  likedPosts = () => { // Need this to sort by date like was created...
    const posts = this.state.posts.filter(p => {
      return p.likes.filter(l => {
        return l.user_id === this.state.user.id
      }).length > 0 ? true : false
    })

    return posts.sort((a, b) => b.id - a.id)
  }

  filteredPosts = () => {
    return this.state.homepageFilter ? this.followedPosts() : this.recentPosts()
  }

  handleHomeTabChange = e => {
    console.log('Changing tab')
    this.setState({ homepageFilter: !this.state.homepageFilter })
  }

// -------------------- routing helper methods -----------------
isReturningUser  = () => {
  return !!localStorage.token
}

isLoggedIn = () => { //Shows login component lag
  return !isEmpty(this.state.user) && !!localStorage.token
}

isLoggedOut = () => { //redirects immediately
  return isEmpty(this.state.user) && !localStorage.token
}

// -------------------- main render method --------------------

  render() {
    return (
      <div id='main' className={this.state.page}>
        <Header loggedIn={this.isLoggedIn()}/>
        <Switch>
          <Route exact path="/login" render={() => {
            return this.isLoggedOut() ? <Login handleLogin={this.handleLogin}/> :
            <Redirect to="/home" />
          }} />

          <Route exact path='/home' render={() => {
            return this.isReturningUser() ?
              <Home
                user={this.state.user}
                posts={this.filteredPosts()}
                handleSubmit={this.createPost}
                loading={this.state.loading}
                handleTabChange={this.handleHomeTabChange}
                handleLogout={this.handleLogout}
              />
              : <Redirect to='/login' />
            }}
          />







          <Route exact path="/index" render={() => {
            return this.isLoggedOut() ? 
              <Redirect to="/login" /> 
                :
              <Index 
                posts={this.displayPosts()} 
                tags={this.state.tags} 
                handleFilter={this.handleFilter} 
                addLike={this.addLike} 
                removeLike={this.removeLike} 
                user={this.state.user} 
                handleTagClick={this.handleTagClick}
              />
            }}
          />

          <Route exact path="/posts/new" render={() => {
            return this.isLoggedOut() ? 
              <Redirect to='/login' /> 
                :
              <PostFormContainer 
                name={"New Post"} 
                user_id={this.state.user.id} 
                handleSubmit={this.createPost} 
                tags={this.state.tags} 
                post={{}}
              />
            }}
          />

          <Route exact path="/posts/:id/edit" render={props => {
            const postId = props.match.params.id
            const post = this.state.posts.find(p => p.id === parseInt(postId))

            if (this.state.loading) {
              return <Loading />
            } else if (!post) {
              Modal.error({
                title: 'Something went wrong',
                content: 'That post does not exist!',
              })
              return <Redirect to='/home' />
            } else if (this.isLoggedOut()) {
              return <Redirect to='/login' />
            } else if (post && post.user.id !== this.state.user.id) {
              Modal.error({
                title: 'Something went wrong',
                content: 'You can only edit your own posts',
              })
              return <Redirect to='/home' />
            } else {
              return <PostFormContainer 
                name={"Edit Post"} 
                user_id={this.state.user.id} 
                handleSubmit={this.editPost}
                handleDelete={this.deletePost} 
                handleNewTags={this.handleNewTags} 
                tags={this.state.tags} 
                post={post} />
              }
            }}
          />

          <Route exact path="/posts/:id" render={props => {
            let postId = props.match.params.id
            let post = this.state.posts.find(p => p.id === parseInt(postId))

            if (this.isLoggedOut()) {
              return <Redirect to='/login' />
            }
            if (!post) {
              Modal.error({
                title: 'Something went wrong',
                content: 'That post does not exist!',
              })
              return <Redirect to='/home' />
            }
            
            return this.state.loading ? 
              <Loading /> 
                : 
              <PostShow post={post} handleDelete={this.deletePost} user={this.state.user} handleTagClick={this.handleTagClick}/>
            }} 
          />

          <Route exact path="/profile/edit" render={() => {
            return this.state.loading ? 
              <Loading /> 
                :
              <EditProfile user={this.state.user} editUser={this.editUser} deleteUser={this.deleteUser} />
            }}
          />

          <Route exact path="/profile/:id" render={props => {
            const profileId = parseInt(props.match.params.id)
            
            return this.state.loading ? 
              <Loading /> 
                :
              <Profile
                id={profileId}
                addLike={this.addLike} 
                removeLike={this.removeLike} 
                currentUser={this.state.user}
              />
            }} 
          />

          <Route exact path="*" render={() => {
            return isEmpty(this.state.user) && !localStorage.token ? 
              <Redirect to='/login' /> 
                :
              <Redirect to='/home' />
            }} 
          />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App
