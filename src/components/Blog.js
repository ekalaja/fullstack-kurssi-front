import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible:false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  likeBlog () {
    const updatedBlog = {
      user: this.props.blog.user._id,
      likes: (this.props.blog.likes +1),
      author: this.props.blog.author,
      title: this.props.blog.title,
      url: this.props.blog.url
    }
    blogService.update(this.props.blog.id, updatedBlog)
  }

  deleteBlog () {
    console.log('poistetaan', this.props.blog.title)
    blogService.remove(this.props.blog.id)
    this.forceUpdate()
  }


  render() {
    const blogStyle = {
      paddingTop: 1,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 1
    }

    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div>
          <p onClick={this.toggleVisibility}>{this.props.blog.title} : {this.props.blog.author}</p>
        </div>
        <div style={showWhenVisible}>
          <table>
            <tbody>
              <tr>
                <td>
                  <a>{this.props.blog.url}</a>
                </td>
              </tr>
              <tr>
                <td>{this.props.blog.likes} likes <button onClick={this.likeBlog.bind(this)}>like</button></td>
              </tr>
              <tr>
                <td>added by {this.props.blog.user.name}</td>
              </tr>
              <tr>
                <td>
                  <button onClick={this.deleteBlog.bind(this)}>delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}


export default Blog
