import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import Togglable from './components/Togglable'
import { userInitialization } from './reducers/userReducer'
import { blogInitialization } from './reducers/blogReducer'
import { blogLike, blogCreation, blogRemove } from './reducers/blogReducer'

import UserList from './components/UserList'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './components/User'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: '',
      password: '',
      newTitle: '',
      newAuthor: '',
      newUrl: ''
    }
  }

  async componentDidMount() {
    this.props.userInitialization()
    this.props.blogInitialization()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(JSON.parse(loggedUserJSON).token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.handleAnnouncement('Wrong username or password')
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogout() {
    window.localStorage.clear()
    window.location.reload()
  }

  handleAnnouncement(message) {
    this.props.notify(message, 5)
  }

  like = (blog) => {
    return () => {

      this.props.blogLike(blog)
      this.handleAnnouncement(`blog ${blog.title} voted`)
    }
  }

  removeBlog = (blog) => {
    return async () => {
      try {
        window.confirm(`delete ${blog.title} by ${blog.author}?`)
        this.props.blogRemove(blog)
        /*const response = await blogService.remove(blog.id)*/
        /*this.updateBlogs()*/
        this.handleAnnouncement('blog deleted')
      } catch(exception) {
        this.handleAnnouncement('Error: something went wrong')
      }
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
    const blogObject = {
      user: this.state.user,
      author: this.state.newAuthor,
      title: this.state.newTitle,
      url: this.state.newUrl
    }
    this.props.blogCreation(blogObject)
    /*const blog = await blogService.create(blogObject)*/
      /*this.updateBlogs()*/
      /*if(blog.id !== undefined) {*/
      this.setState({
          newTitle: '',
          newAuthor: '',
          newUrl: ''
        })
      /* this.handleAnnouncement(`a new blog ${blog.title} by ${blog.author}`)
       }*/

  } catch(exception) {
      this.handleAnnouncement('invalid blog information')
    }
  }

  render() {

    const blogForm = () => (
      <div>
        <h2>Create new</h2>

        <form onSubmit={this.addBlog}>
          <div>
            title
            <input
              value={this.state.newTitle}
              name="newTitle"
              onChange={this.handleBlogChange}
            />
          </div>
          <div>
            author
            <input
              value={this.state.newAuthor}
              name="newAuthor"
              onChange={this.handleBlogChange}
            />
          </div>
          <div>
            url<input
              value={this.state.newUrl}
              name="newUrl"
              onChange={this.handleBlogChange}
            />
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    )

    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div className="usernameField" >
            username&nbsp;&nbsp;
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password&nbsp;&nbsp;
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const loggedIn = () => (
      <div>
        <p>{this.state.user.name} logged in</p>
        <button onClick={this.handleLogout}>logout</button>
        <Togglable buttonLabel="Add New">
          {blogForm()}
        </Togglable>
        <h2>blogs</h2>
        {this.props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} like={this.like} removeBlog={this.removeBlog}/>
        )}
      </div>
    )
    const loggedOrNot = () => {
      if (this.state.user===null) {
        return loginForm()
      }
      return loggedIn()
    }

    const userById = (id) => {
      return this.props.users.find(user => user.id === (id))
    }

    return (
      <div>
        <Router>
          <div>
            <div>
              <Link to="/">home</Link> &nbsp;
              <Link to="/users">users</Link>
            </div>
            <Notification />
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({match}) =>
              <User user={userById(match.params.id)} />}
            />
            <Route exact path="/" render={() => loggedOrNot()} />
          </div>
        </Router>
      </div>

    );
  }
}

const mapStateToProps =  (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { notify, userInitialization, blogInitialization, blogLike, blogCreation, blogRemove}
)(App)
