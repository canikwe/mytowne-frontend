import React from 'react'
import { Link } from 'react-router-dom'

const TopPosts = ({ posts }) => {
    return (
        <table className='top-posts'>
            <thead>
                <tr>
                    <th colSpan="2">Recent Posts</th>
                </tr>
            </thead>
            { posts.map((p, index) => {
                return(
                    <tbody key={p.id}>
                        <tr>
                            <td>{index + 1}.</td>
                            <td><Link to={`/posts/${p.id}`}>{p.title}</Link></td>
                        </tr>
                    </tbody>
                )
            }) }
        </table>
    )
}

export default TopPosts