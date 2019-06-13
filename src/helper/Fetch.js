// import React, { PureComponent } from 'react'

export default class Fetch {

  static token() {
    return localStorage.getItem('token')
  }

  static URL() {
    return 'http://localhost:3000/api/v1/'
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
}