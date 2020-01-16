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
      'Authorization': `Bearer ${this.token()}`
    })
  }

  static GET(route) {
    return fetch(this.URL() + route, {
      method: 'GET',
      headers: this.headers()
    })
    .then(res => res.json()) 
  }

  static POST(data, route) {
    return fetch(this.URL() + route, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }

  static PATCH(data, id, route) {
    return fetch(this.URL() + route + id, {
      method: 'PATCH',
      headers: this.headers(),
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }

  static DELETE(id, route){
    return fetch(this.URL() + route + id, {
      method: "DELETE",
      headers: this.headers()
    }).then(res => res.json())
  }
}