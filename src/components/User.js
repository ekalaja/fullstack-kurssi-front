import React from 'react'

const User = (props) => {
  console.log('mapstatesta', props.user)
  if (props.user === undefined) {
    return null
  }
  return (
    <div>
      {console.log(props.user.blogs)}
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      {props.user.blogs.map(blog =>
          <div key={blog._id}>
            <li>{blog.title}</li>
          </div>
      )}
    </div>)
}

export default User
