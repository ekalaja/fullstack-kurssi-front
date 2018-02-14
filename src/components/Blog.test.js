import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {

  it('before clicking name only title and author are displayed', () => {
    const blog =  {
      title: 'Komponenttitestausta tapahtuu',
      author: 'Teppo Testaaja',
      url: 'hieno.fi',
      likes: 3,
    }

    const mockHandlerLike = jest.fn()
    const mockHandlerRemove = jest.fn()


    const blogComponent = shallow(<Blog blog={blog} like={mockHandlerLike} removeBlog={mockHandlerRemove} />)
    const titleDiv = blogComponent.find('.title')
    const urlDiv = blogComponent.find('.url')
    const togglableDiv = blogComponent.find('.togglableContent')

    expect(togglableDiv.getElement().props.style).toEqual({ display: 'none' })
    expect(titleDiv.text()).toContain(blog.title)
    expect(titleDiv.text()).toContain(blog.author)
    expect(urlDiv.text()).toContain(blog.url)
  })


  it('after clicking name the details are displayed', () => {
    const blog =  {
      title: 'Komponenttitestausta tapahtuu',
      author: 'Teppo Testaaja',
      url: 'hieno.fi',
      likes: 3,
    }

    const mockHandlerLike = jest.fn()
    const mockHandlerRemove = jest.fn()


    const blogComponent = shallow(<Blog blog={blog} like={mockHandlerLike} removeBlog={mockHandlerRemove} />)

    // haetaan klikattava osa komponentista
    const nameDiv = blogComponent.find('.title')
    nameDiv.simulate('click')
    const togglableDiv = blogComponent.find('.togglableContent')


    // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
    const urlDiv = blogComponent.find('.url')
    const likesDiv = blogComponent.find('.likes')
    expect(urlDiv.text()).toContain(blog.url)
    expect(likesDiv.text()).toContain(blog.likes)
    expect(togglableDiv.getElement().props.style).toEqual({ display: '' })


  })
})