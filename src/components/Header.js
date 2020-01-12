import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Input } from 'antd'
import '../styles/NavBar.css'

const Header = () => {

  return(
    <div className='header'>
      <Row type='flex' align='bottom'>
        <Col span={2} offset={1}>
          <img src={require('../helper/cityscape.svg')} alt='home' className='header-logo'/>
        </Col>
        <Col span={2}>
          <Link to='/home'>
            <h1 className='header-title'>myTowne</h1>
          </Link>
        </Col>
        <Col span={4} offset={8}>
          <div className='search-border'>
            <Input.Search 
              placeholder='Search...' 
              value={'hay'} 
              onSearch={(v, e) => console.log(v, e)}
              id='search'
            />
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default Header