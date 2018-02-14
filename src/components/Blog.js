import React from 'react'
class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      props: props,
      visible: false,
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

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render () {
    const blogStyle = {
      paddingTop: 1,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 1
    }
    const showWhenVisible = {display: this.state.visible ? '' : 'none'}
    const showDelete = {display: this.state.visibleDelete? '' : 'none'}


    return (
      <div style={blogStyle}>
        <p onClick={this.toggleVisibility}>{this.props.blog.title} : {this.props.blog.author}</p>
        <div style={showWhenVisible}>
          <table>
            <tbody>
              <tr>
                <td>
                  <a>{this.props.blog.url}</a>
                </td>
              </tr>
              <tr>
                <td>{this.props.blog.likes} likes <button onClick={this.props.like(this.props.blog)}>like</button></td>
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
export default Blog
