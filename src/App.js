import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      error: null,
      announcement: null,
      username: '',
      password: '',
      newTitle: '',
      newAuthor: '',
      newUrl: ''
    }
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    this.setState({blogs})
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
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
      this.setState({
        error: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
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
    if (message.includes('Error')) {
      this.setState({
        error: message,
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } else {
      this.setState({
        announcement: message,
      })
      setTimeout(() => {
        this.setState({ announcement: null })
      }, 5000)
    }
  }




  async updateBlogs() {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    this.setState({blogs})
  }

  like = (blog) => {
    return async () => {
      const updatedBlog = {
        user: blog.user._id,
        likes: (blog.likes + 1),
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      const updated = await blogService.update(blog.id, updatedBlog)
      console.log(updated)
      this.updateBlogs()
      /* const blogs = this.state.blogs.filter(blog => blog.id !== updated.id).concat(updated)
      this.setState({blogs})*/

    }
  }

  removeBlog = (blog) => {
    return async () => {
      try {
        window.confirm(`delete ${blog.title} by ${blog.author}?`)
        const response = await blogService.remove(blog.id)
        console.log(response)
        this.handleAnnouncement(response)
        this.updateBlogs()
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
      author: this.state.newAuthor,
      title: this.state.newTitle,
      url: this.state.newUrl
    }
    const blog = await blogService.create(blogObject)
      this.updateBlogs()
      console.log(blog)
      if(blog.id !== undefined) {
        this.setState({
          announcement: `a new blog ${blog.title} by ${blog.author}`,
          newTitle: '',
          newAuthor: '',
          newUrl: ''
        })
        setTimeout(() => {
          this.setState({ announcement: null })
        }, 5000)

      }

  } catch(exception) {
    this.setState({
      error: 'invalid blog information',
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
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
        <Notification message={this.state.announcement} />

        <p>{this.state.user.name} logged in</p>
        <button onClick={this.handleLogout}>logout</button>
        <Togglable buttonLabel="Add New">
          {blogForm()}
        </Togglable>
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} like={this.like} removeBlog={this.removeBlog}/>
        )}
      </div>
    )


    return (
      <div>
        <Notification message={this.state.error} type={'error'} />
        {this.state.user === null ?
          loginForm() :
          loggedIn()
        }
      </div>

    );
  }
}

export default App;
