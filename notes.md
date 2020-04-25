# Project Notes

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

+ App ⭐️
  + Header
    + _Logo & Title_
    + NavMenu
    + _Search_
    + UserMenu

// { Begin Router Switch }

  + Home ⭐️ { user, posts, loading, handleTabChange }
    <!-- + QuickPost { user } ✅ -->
    <!-- + HomeFilters { handleTabChange } -->
    + FeaturedPost { post }
    + PostFeed { posts } ✅
      + PostCard { post } ✅
    + Alerts/Weather
    + PostBar { posts }
  + PostDetails { post }
    + Tags(?)
  + PostFormContainer ⭐️ New
    + PostForm
    + Tags
  <!-- + PostFormContainer ⭐️ Edit
    + PostForm
    + Tags -->
  + Profile { id, currentUser }
    + UserDetails { currentUser, user }
    <!-- + PostList { posts } -->
    + PostTile { post } . . . .
  + PostIndex ⭐️
    + Filter
    + PostContainer
      + Post
  + Login ⭐️{ handleLogin } ✅

  + Loading ???
  + NotFound

## State

+ App
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

+ Home
  ```javascript
    this.state = {
      index: 0, //used for post pagination. Can remove when infinite scroll is implemented. Then content can be moved to App and Home can go back to a functional component
      content: '' //used for quick posts. Can refactor to App
    }
  ```

+ Profile
  ```javascript
    this.state = {
      user: {},
      posts: [],
      redirect: false,
      loading: true
    }
  ```

+ Login
  ```javascript
    this.state = { //fine to keep since the rest of the app does not need to know about this.
      username: '',
      password: ''
    }
  ```

## Routes

  + '/home'
  + '/login'
  + '/posts/new'
  + /posts/:id
  <!-- + /posts/:id/edit -->
  + /users/:id
  <!-- + /profile/edit -->
  + /

## To-do

+ Consolidate where all images will live
+ img default should be empty string and not null
+ title default should be an empty string as well
+ Add more validation messages as the user interacts with the site (i.e. New post created! Profle edited! etc.)
+ Fetch NewsFeed with the token, not with sorting through all posts
+ Validate current user before allowing PostTag updates, likes, or follows

+ Finish carousel styling
<!-- + Add comments -->
+ Link all tags clicks to community board and update filters at the same time
<!-- + Update postshow images (set max size based on window size) -->
+ Stagger animations for profile view
+ Avatar initials when no profile photo
<!-- + Add footer -->
+ New/Edit form not showing?
+ Fix all links (make sure they go somewhere or comment out for now)
+ Fix tags styling on new/edit form
+ Add events
+ Add follow
  + Decide what that means in terms of displayed posts
+ Active storage
+ Action cable

