import moment from 'moment'

export const displayPostDate = date => {

  const postDate = moment(date)

  return !postDate.isSame(moment(), 'week') ? postDate.calendar(null, { sameElse: 'DD-MMM' }) : postDate.fromNow()
}