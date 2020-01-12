import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import '../styles/NavBar.css'

const Header = () => {

  return(
    // <div className='header'>
      <Row>
        <Col span={2} offset={1}>
          <img src={require('../helper/cityscape.svg')} alt='home' className='header-logo'/>
        </Col>
        <Col span={2}>
          <Link to='/home'>
            <h1>myTowne</h1>
          </Link>
        </Col>
      </Row>

  )

}

export default Header

/* <Link to='/home'>
        <span>
          </span>
      </Link>
 search goes here somewhere!
  </div> 
*/