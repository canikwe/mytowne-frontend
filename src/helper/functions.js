import moment from 'moment'

export const displayPostDate = date => {
  const postDate = moment(date)

  return !postDate.isSame(moment(), 'week') ? postDate.calendar(null, { sameElse: 'DD-MMM' }) : postDate.fromNow()
}

export const replaceMissingImg = e => {
  const funImg = 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
  const boringImg = 'images/placeholder.png'
  e.target.src = funImg
}

export const removeMissingImg = e => {
  e.target.remove()
}