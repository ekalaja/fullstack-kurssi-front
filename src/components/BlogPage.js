import React from 'react'

const BlogPage = (props) => {
  console.log('mapstatesta', props.user)
  if (props.blog === undefined) {
    return null
  }
  return (
    <div>
      {console.log(props.blog)}
      <h2>{props.blog.title}</h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <p>
        <a className="likes">{props.blog.likes} likes <button onClick={props.like(props.blog)}>like</button></a>
      </p>
      <p>added by {props.blog.user.username}</p>
    </div>)
}

export default BlogPage
