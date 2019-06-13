// import React, { PureComponent } from 'react'

export default class Fetch {

  static token() {
    return localStorage.getItem('token')
  }

  static URL() {
    return 'http://localhost:3000/api/v1/'
  }

  static headers() {
    return ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  static GET(route) {
    return fetch(this.URL() + route, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token()}`,
      }
    })
    .then(res => res.json()) 
  }

  static POST(data, route) {
    return fetch(this.URL() + route, {
      methid: 'POST',
      headers: this.headers(),
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }
}