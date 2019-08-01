import React from 'react'
import Cards from '../containers/Cards'
import Grid from '@material-ui/core/Grid'
import '../styles/Cards.css'



const CardContainer = ({ classes, posts, name, avatar }) => {

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => name ? <Cards post={post} name={name} avatar={avatar} key={post.id} /> : <Cards post={post} key={post.id} /> )}
    </Grid>
  )
}

export default CardContainer
