import React, { PureComponent } from 'react'
import { Tag } from 'antd'

class EditProfile extends PureComponent {
  constructor(props) {
    super(props)
    const { name, birth_date, email, username, avatar, bio, followed_tags } = props.user

    this.state = {
      name, birth_date, email, username, avatar, bio, tag_ids: followed_tags
    }
  }

  handleChange = (e) => {
    if (typeof e === 'number') {
      const { tag_ids } = this.state
      const newFollowedTags = tag_ids.indexOf(e) === -1 ? [...tag_ids, e] : tag_ids.filter(t => t !== e)
      console.log(newFollowedTags)
      this.setState({
        tag_ids: newFollowedTags
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleSave = () => {
    this.props.editUser(this.state, this.props.user.id)
  }

  render() {
    const { name,username, email, birth_date, avatar, bio, tag_ids } = this.state
    const { tags } = this.props
    return(
      <div id='profile-form-container'>
        <h1>
          Edit Profile
        </h1>
        <div className='form-container'>
          <div className='profile-col'>

            <div className='input-label'>
              <label htmlFor='name'>Name: </label>
            </div>
            <div className='input'>
              <input type='text' name='name' value={ name } onChange={this.handleChange} disabled />
            </div>
            <p />
            <div className='input-label'>
              <label htmlFor='username'>Username: </label>
            </div>
            <div className='input'>
              <input type='text' name='username' value={ username } onChange={this.handleChange} />
            </div>
            <p />

            <div className='input-label'>
              <label htmlFor='email'>Email: </label>
            </div>
            <div className='input'>
              <input type='text' name='email' value={ email } onChange={this.handleChange} />
            </div>

            <p />
          {/* <label htmlFor='town'>Town: </label>
          <input type='text' name='town' value={this.state.town} onChange={this.handleChange} disabled /> */}

            <div className='input-label'>
              <label htmlFor='birthday'>Birthday: </label>
            </div>
            <div className='input'>
              <input type='date' name='birth_date' value={ birth_date } onChange={this.handleChange} />
            </div>
            <p />

            <div className='input-label'>
            <label htmlFor='avatar'>Avatar URL: </label>
            </div>
            <div className='input'>
              <input type='text' name='avatar' value={ avatar } onChange={this.handleChange} />
            </div>
            <p />

            <div className='input-label'>
              <label htmlFor='bio'>Bio: </label>
            </div>
            <div className='input'>
              <textarea name='bio' value={ bio } onChange={this.handleChange} rows='8' cols='50' />
            </div>
            <h3>Select Followed Tags for your Post Feed <span role='img' aria-label='confetti'>🎉</span></h3>
            {
              tags.map(t => <Tag.CheckableTag key={t.id} checked={tag_ids.indexOf(t.id) > -1} onChange={() => this.handleChange(t.id)}>{t.name}</Tag.CheckableTag>)
            }
            
          </div>
        </div>
        <button className='btn' onClick={this.handleSave}>Save Changes</button>        
      </div >

    )
  }
}

export default EditProfile
