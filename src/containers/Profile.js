import React, { PureComponent } from 'react'
import { Tabs } from 'antd'
import ProfileCard from '../components/ProfileCard'
import PostTile from '../components/PostTile'
import '../styles/Profile.css'

class Profile extends PureComponent {
  constructor(){
    super()
    this.state = {
      defaultPosts: true,
      editing: false,
    }
  }


  toggleDisplayedPosts = () => this.setState({ defaultPosts: !this.state.defaultPosts})

  updateEditing = () => this.setState({ editing: !this.state.editing })

  render() {
    const { defaultPosts } = this.state
    const { authoredPosts, handleTagClick, editable, user, currentUserId, likedPosts, followUser } = this.props
    const displayedPosts = defaultPosts ? authoredPosts : likedPosts

    if (!user) {
      return <h1>Loading...</h1>
    } 
    return (
      <div className='profile-container'>
        <ProfileCard 
          user={user} 
          currentUserId={currentUserId}
          posts={authoredPosts} 
          likedPosts={likedPosts}
          editable={editable}
          handleEdit={this.updateEditing}
          followUser={followUser}
        />

        <div className='post-nav'>
          <Tabs defaultActiveKey='1' onChange={this.toggleDisplayedPosts} >
            <Tabs.TabPane tab='Posts' key='1'></Tabs.TabPane>
            <Tabs.TabPane tab='Likes' disabled={!likedPosts.length} key='2'></Tabs.TabPane>
          </Tabs>
        </div>

        {displayedPosts.map((p, i) => <PostTile key={p.id} post={p} handleTagClick={handleTagClick} delay={i + 1}/> )}

      </div>
    )
  }
}

export default Profile