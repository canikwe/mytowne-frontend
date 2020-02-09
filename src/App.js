import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Modal } from 'antd'
import Login from './containers/Login'
// import NavMenu from './components/NavMenu'
// import SideBar from './components/SideBar'
import Home from './containers/Home'
import PostDetails from './components/PostDetails'
import PostFormContainer from './containers/PostFormContainer'
import Profile from './containers/Profile'
import EditProfile from './containers/EditProfile'
import Fetch from './helper/Fetch'
import Header from './components/Header'
// import Filter from './components/Filter'
// import CardContainer from './containers/CardContainer'
// import Footer from './components/Footer'
import Loading from './components/Loading'
import PostIndex from './containers/PostIndex'
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
      filters: {
        tags: [],
        sort: '',
        direction: 'asc'
      },
      tags: [],
      loading: true,
      searchInput: '',
      page: '',
      homepageFilter: true,
      collapsed: false
    })
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.fetchCurrentUser()
      this.fetchPosts()
      this.fetchTags()
    } else {
      this.setState({ page: 'login' })
    }
  }

 // -------------------- fetch helper methods -------------------- 

   fetchCurrentUser = () => {
    Fetch.GET('profile')
    .then(data => {
      if (data.user) {
        this.setState({ user: data.user, page: 'default' })
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
      this.catchError(err)
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
    .catch(this.catchError)
  }

  fetchTags = () => {
    Fetch.GET('tags')
    .then(tags => { 
      tags.sort((a, b) => {
        return a['name'].localeCompare(b['name'])
      })
      this.setState({ tags })
    })
    .catch(this.catchError)
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
    .catch(this.catchError)
  }

  // Like Posts
  addLike = (likeData) => {
    Fetch.POST(likeData, 'likes')
    .then(res => {
      const post = res.post

      this.setState({
        posts: this.state.posts.map(p => p.id === post.id ? post : p)
      })
    })
    .catch(this.catchError)
  }

  removeLike = (id) => {
    Fetch.DELETE(id, 'likes/')
    .then(post => {
      this.setState({
        posts: this.state.posts.map(p => p.id === post.id ? post : p)
      })
    })
    .catch(this.catchError)
  }

  handleLike = (userId, post) => {
    const like = post.likes.find(l => l.user_id === userId)

    if (like) {
      this.removeLike(like.id)
    } else {
      const likeData = {like: {user_id: userId, post_id: post.id}}
      this.addLike(likeData)
    }
  }
  
  editPost = (data, post) => {
    Fetch.PATCH(data, post.id, 'posts/')
    .then(resp => {

      if (!this.auth_error(resp)) {
        const { post, tags } = resp
  
        this.setState({
          posts: this.state.posts.map(p => p.id === post.id ? post : p),
          tags: tags
        })
      }
    })
    .catch(this.catchError)
  }

  deletePost = (id) => {
    Fetch.DELETE(id, 'posts/')
    .then(post => {
      if (!this.auth_error(post)) {
        const posts = this.state.posts.filter(p => p.id !== id) 
        this.setState({ posts })
      }
    })
    .catch(this.catchError)
  }

  editUser = (data, userId) => {
    Fetch.PATCH(data, userId, 'users/')
    .then(user => {
      if (!this.auth_error(user)) {
        this.setState({ user })
        Modal.success({
          content: 'Your changes have been saved!'
        })
      }
      return <Redirect to='/profile' />
    })
    // .then(() => {
    //   Modal.success({
    //     content: 'Your changes have been saved!'
    //   })
    //   return <Redirect to='/profile' />
    // })
    // .then(window.history.back())
    .catch(this.catchError)
  }

  deleteUser = (id) => {
    Fetch.DELETE(id, 'users/')
    // .then(res => res.json())
    .then(this.handleLogout)
    .catch(err => {
      this.catchError(err)
      debugger
    })
  }

  handleLogin = (data) => {
    // debugger
    Fetch.POST(data, 'login')
    .then(data => {
      // debugger
      if (data.error) {
        this.handleError(data)
      } else {
        localStorage.setItem('token', data.jwt)
        this.setState({ user: data.user, page: 'default' })
        this.fetchPosts(data.jwt)
        this.fetchTags()
      }
    })
    .catch(this.catchError)
  }

// -------------- Error Handling Helper Messages --------------

  handleError = resp => {
    return Modal.error({
      title: resp.error,
      content: 'Please try again',
    })
  }

  catchError = err => {
    return Modal.error({
      title: 'Something went wrong',
      content: err.message,
    })
  }

  auth_error = (resp) => {
    if (resp.errors) {
      Modal.error({
        title: 'Something went wrong',
        content: resp.errors.join(', '),
      })
      return <Redirect to='/home' />
    }
    return false
  }

// -------------------- state changing helper methods --------------------

  updateFilter = tags => this.setState({ filters: {...this.state.filters, tags} })

  updateSort = sort => this.setState({ filters: {...this.state.filters, sort} })

  handleSearch = (e) => this.setState({ searchInput: e.target.value })

  updateFilterDirection = e => this.setState({ filters: {...this.state.filters, direction: e.target.value} })

  handleLogout = () => {
    const defaults = this.initialState()
    defaults.page = 'login'
    
    localStorage.clear()
    this.setState(defaults)
  }

  handleTagClick = postTag => {
    this.setState({
      filters: {...this.state.filters, tags: [postTag.tag_name] }
    })
  }

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  
// -------------------- presentation/rendering helper methods --------------------
  
  //Filtering POSTS by tags
  filterByTag = () => {
    
    if (this.state.filters.tags.length) {
      const filteredPosts = this.state.posts.filter(post => {
        const tags = post.tags.map(t => t.name) // map all tag names to an unnested array
  
        const missingFilter = this.state.filters.tags.find(f => { // check to see if the filter tag is included in the post's tags
          return !tags.includes(f)
        })
        return !missingFilter // only include post if there are no missing filters from the post's tags
      })
      return filteredPosts
    } else {
      return [...this.state.posts]
    } 
  }

  filterBySearch = (posts) => posts.filter(p => p.title.toLowerCase().includes(this.state.searchInput.toLowerCase() )) 

  sortPosts = (posts) => {
    const filters = this.state.filters

    switch (filters.sort) {
      case 'alpha':
        return filters.direction === 'asc' ? posts.sort((a, b) => a.title > b.title ? 1 : -1) : posts.sort((a, b) => a.title < b.title ? 1 : -1) 
      case 'likes':
        return filters.direction === 'asc' ? posts.sort((a, b) => b.likes.length - a.likes.length) : posts.sort((a, b) => a.likes.length - b.likes.length)
      default:
        return filters.direction === 'asc' ? posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : posts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) 
    }
  }

  // Check for searchTerm
  displayPosts = () => {
    const tagFilter = this.filterByTag()
    const searchFilter = this.filterBySearch(tagFilter)
    
    return this.sortPosts(searchFilter)

    // return filteredPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
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

  displayRecentPosts = () => {
    return [...this.state.posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }

  getAuthoredPosts = (id) => {
    return this.state.posts.filter(p => p.user.id === id)
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

    // const { collapsed, user, loading } = this.state
    // console.log(this.props)

    const { user, posts } = this.state

    return (
      <div className={this.state.page}>
        {
          this.isLoggedIn() ? 
            <Header handleLogout={this.handleLogout} user={user} /> 
          : null
        }
        <Switch>
          <Route exact path="/login" render={() => {
            return this.isLoggedOut() ? <Login handleLogin={this.handleLogin}/> : <Redirect to="/home" />
            }} 
          />

          <Route exact path='/home' render={() => {
            return this.isReturningUser() ?
              <Home
                user={this.state.user}
                posts={this.filteredPosts()}
                recentPosts={this.displayRecentPosts()}
                handleSubmit={this.createPost}
                loading={this.state.loading}
                handleTabChange={this.handleHomeTabChange}
              />
              : <Redirect to='/login' />
            }}
          />

          <Route exact path="/profile/:id" render={props => {
            if (this.isLoggedOut()) {
              return <Redirect to='/login' />
            }
            const profileId = parseInt(props.match.params.id)
            const authoredPosts = this.getAuthoredPosts(profileId)

            return <Profile id={profileId} posts={authoredPosts}/>
            }}
          />

          <Route exact path="/index" render={() => {
            return this.isLoggedOut() ? 
              <Redirect to="/login" /> 
                :
                <PostIndex
                  filters={this.state.filters}
                  handleFilter={this.updateFilter}
                  handleSort={this.updateSort}
                  tags={this.state.tags}
                  posts={this.displayPosts()}
                  addLike={this.addLike}
                  removeLike={this.removeLike}
                  user={this.state.user}
                  handleDirection={this.updateFilterDirection}
                  // handleTagClick={this.handleTagClick}
                />
              }
            }
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
            const postId = props.match.params.id
            const post = this.state.posts.find(p => p.id === parseInt(postId))

            if (this.isLoggedOut()) {
              return <Redirect to='/login' />
            } else if (this.state.loading) {
              return <Loading />
            } else if (!post) {
              Modal.error({
                title: 'Something went wrong',
                content: 'That post does not exist!',
              })
              return <Redirect to='/home' />
            } else {
              return <PostDetails 
                post={post} 
                handleDelete={this.deletePost} 
                user={this.state.user} 
                handleTagClick={this.handleTagClick}
                handleLike={this.handleLike}
              />
              }}
            }
          />

          <Route exact path="/account" render={() => {
            return this.state.loading ? 
              <Loading /> 
                :
              <EditProfile user={this.state.user} editUser={this.editUser} deleteUser={this.deleteUser} />
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
      </div>
    );
  }
}

export default withRouter(App)
