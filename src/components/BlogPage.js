import React from 'react'
import { connect } from 'react-redux'
import { commentCreation } from '../reducers/blogReducer'

class BlogPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      props: props,
      newComment: '',
      blogId: ''
    }

  }



  rightsToDelete(props) {
    if (this.props.blog.user === undefined) {
      return true
    } else {
      if (this.props.blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username) {
        return true
      }
    }
  }

    removeButton = () => {
      return (
        <button onClick={this.props.removeBlog(this.props.blog)}>delete</button>
      )
    }
  handleCommentChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  addNewComment = async (event) => {
    event.preventDefault()
    try {
      const commentObject = {
        title: this.state.newComment,
        blogId: this.props.blog.id
      }
      this.props.commentCreation(commentObject)
      this.props.history.push(`/blogs/${this.props.blog.id}`)

    } catch(exception) {
      this.handleAnnouncement('invalid comment information')
    }
  }
    render() {
      if (this.props.blog === undefined) {
        return null
      }
      return (
        <div>juhuu
          <h2>{this.props.blog.title}</h2>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>
            <a className="likes">{this.props.blog.likes} likes <button onClick={this.props.like(this.props.blog)}>like</button></a>
          </p>
          {this.rightsToDelete ? this.removeButton() : null}
          <p>added by {this.props.blog.user.username}</p>

          <h3>comments</h3>

          <input
            type="text"
            name="newComment"
            value={this.state.newComment}
            onChange={this.handleCommentChange}
          />
          <button onClick={this.addNewComment}>New Comment</button>
          {this.props.blog.comments.map(comment =>
            <li key={comment._id}>
              {comment.title}
            </li>)}

        </div>)
    }
  }



const ConnectedBlogPage = connect(
  null,
  { commentCreation }
)(BlogPage)

export default ConnectedBlogPage

