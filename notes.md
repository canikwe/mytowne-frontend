# Notes

## User Stories

+ see tailored newsfeed based on liked tags
  ✅render posts to the screen
  + truncate the posts shown to 10 and implement an infinite scroll for the rest
✅login to app
+ see user's profile
+ create new posts
+ edit existing posts
+ add/remove tags from your likes
+ like posts
+ search through all posts based on filters (tags, words person)
+ globally search and pull up and group top results

## Component hierarchy

App ⭐️
  Header
  Home ⭐️ { user, posts, loading, handleTabChange }
  ```javascript
    state = {
      index: 0, //used for post pagination. Can remove when infinite scroll is implemented. Then content can be moved to App and Home can go back to a functional component
      content: '' //used for quick posts. Can refactor to App
    }
  ```
    SideBar { user, loading } ✅
    QuickPost { user } ✅
    PostFeed { posts } ✅
      PostCard_{ post } ✅
    Alerts/Weather
    ChatBox
  _PostExpanded (Post show page)_ { post }
  <!-- implement comments? research how to do comments and replies in rails tomorrow! -->
    Tags(?)
  PostFormContainer ⭐️ New
    PostForm
    Tags
  PostFormContainer ⭐️ Edit
    PostForm
    Tags
  Profile { id, addLike, removeLike, currentUser }
  ```javascript
    this.state = {
      user: {},
      posts: [],
      redirect: false
    }
  ```
    ProfileCard { user }
    PostFeed { posts }
      PostCard { post }
  Index ⭐️
    Filter
    PostContainer
      PostTile
  Login ⭐️{ handleLogin } ✅
  ```javascript
    this.state = { //fine to keep since the rest of the app does not need to know about this.
      username: '',
      password: ''
    }
  ```
  Loading ???
  NotFound

## State

```javascript
  state = {
    user: {},
    posts: [],
    filters: {
      searchTerm: '',
      tags: []
    },
    tags: [], // maybe this can be derived from the posts?
    loading: true,
    homepageFilter: true // Not sure if this is needed in App...
    page: 'login' // Think there's a better way to change the styling based on page
  }
```

## Routes

  + '/home'
  + '/login'
  + '/posts/new'

## To-do

+ Consolidate where all images will live
+ img default should be empty string and not null
+ title default should be an empty string as well
+ Add more validation messages as the user interacts with the site (i.e. New post created! Profle edited! etc.)