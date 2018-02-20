import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      expect(app.find('.usernameField').length).toEqual(1)
    })

    it('notes are not rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }

      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      app = mount(<App />)
      // luo sovellus siten, että käyttäjä on kirjautuneena
    })

    it('all notes are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
    it('login form is not rendered', () => {
      app.update()
      expect(app.find('.usernameField').length).toEqual(0)
    })
  })
})