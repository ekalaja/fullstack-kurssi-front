import React from 'react'
import PropTypes from 'prop-types'
class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      props: props,
      visibleDelete: rightsToDelete(props)
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
  }

  render () {
    const blogStyle = {
      paddingTop: 1,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 1
    }
    /*const showWhenVisible = {display: this.state.visible ? '' : 'none'}*/
    const showDelete = {display: this.state.visibleDelete? '' : 'none'}

    return (
      <div style={blogStyle}>
        <a className="title" href={`/blogs/${this.props.blog.id}`}>{this.props.blog.title} : {this.props.blog.author}</a>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <a className="url">{this.props.blog.url}</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a className="likes">{this.props.blog.likes} likes <button onClick={this.props.like(this.props.blog)}>like</button></a>
                </td>
              </tr>
              <tr>
                <td><button style={showDelete} onClick={this.props.removeBlog(this.props.blog)}>delete</button></td>
              </tr>
              <tr>
                <td>added by: {this.props.blog.user === undefined ? 'no user defined' : this.props.blog.user.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
