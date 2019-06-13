// import React, { PureComponent } from 'react'

export default class Fetch {

  static token() {
    return localStorage.getItem('token')
  }

  static GET() {
    return fetch(`http://localhost:3000/api/v1/posts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token()}`,
      }
    })
    .then(res => res.json()) 
  }
}