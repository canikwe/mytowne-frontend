import React from 'react'
import '../styles/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return(
    <div id='footer'>
      <div id='footer-content'>
        <h3>
          About the Site
        </h3>
        <p>myTowne is a community bulletin board. Get to know your neighbors by posting welcome messages. Stay up to day on events and news happening in your town. Curate your homepage by specifying the tags/community members you want to follow.</p>
      </div>

      <div id='footer-links'>
        <h3>
          Site Links
        </h3>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/posts'>Community Board</Link>
          </li>
          <li>
            <Link to='/account'>Account</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <a href='https://github.com/canikwe/mytowne-frontend'>Frontent Github Repo</a>
          </li>
          <li>
            <a href='https://github.com/canikwe/mytowne-backend'>Backend Github Repo</a>
          </li>
        </ul>
      </div>
      <div id='footer-credits'>
        Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </div>
    </div>
  )
}

export default Footer