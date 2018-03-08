import React from 'react'
import { connect } from 'react-redux'
import { commentCreation } from '../reducers/blogReducer'

const BlogPage = (props) => {
  console.log('mapstatesta', props.user)
  if (props.blog === undefined) {
    return null
  }

  function rightsToDelete(props) {
    if (props.blog.user === undefined) {
      return true
    } else {
      if (props.blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username) {
        return true
      }
    }
  }
  const removeButton = () => {
    return (
      <button onClick={props.removeBlog(props.blog)}>delete</button>
    )
  }

  return (
    <div>
      {console.log(props.blog)}
      <h2>{props.blog.title}</h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <p>
        <a className="likes">{props.blog.likes} likes <button onClick={props.like(props.blog)}>like</button></a>
      </p>
      {rightsToDelete ? removeButton() : null}
      <p>added by {props.blog.user.username}</p>

      <h3>comments</h3>
      <form onSubmit={props.commentCreation('jep')}>
        <div>
          <input
          name="newComment"
        />
        </div>
        <button type="New Comment">save</button>
      </form>
      {console.log(props.blog.comments)}
      {props.blog.comments.map(comment =>
        <li key={comment._id}>
          {comment.title}
        </li>)}

    </div>)
}


export default connect(
  null,
  {commentCreation}
)(BlogPage)