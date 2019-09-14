import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const TopPosts = ({ posts }) => {

    const postRow = (p, index) => (
        <tbody key={p.id}>
            <tr>
                <td>{index + 1}.</td>
                <td><Link to={`/posts/${p.id}`}>{p.title}</Link></td>
                <td>{ moment(p.created_at).format('MM-DD-YYYY') }</td>
            </tr>
        </tbody>
    )

    return (
        <table className='top-posts'>
            <thead>
                <tr>
                    <th colSpan="3">Recent Posts</th>
                </tr>
            </thead>
            {posts.map(postRow)}
        </table>
    )
}

export default TopPosts