import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Input } from 'antd'
import NavMenu from '../components/NavMenu'
import '../styles/NavBar.css'

const Header = ({ loggedIn, stickHeader }) => {


  
  return(
    <div className='header' id='nav-container'>

        <div className='item1'>

          <img src={require('../helper/cityscape.svg')} alt='home' className='header-logo'/>
        {/* </Col>
        <Col span={2}> */}
      </div>
        <div className='item2'>
          <Link to='/home'>
            <h1 className='header-title'>myTowne</h1>
          </Link>

        </div>

        <div className='item3'>

        {/* </Col>
        <Col span={8}> */}
          <NavMenu
            // user={user}
            // loading={loading}

          />

        {/* </Col> */}
      </div>

      <div className='item4'>
        
        { loggedIn ? 
          // <Col span={4} offset={8}>
            <div className='search-border'>
              <Input.Search 
                placeholder='Search...' 
                // value={'hay'} 
                // onChange={}
                onSearch={(v, e) => console.log(v, e)}
                id='search'
              />
            </div>
          // </Col>
        : null }
      {/* </Row> */}
      </div>

    </div>
  )
}

export default Header