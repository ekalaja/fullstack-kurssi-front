import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const simpleBlog = {
      title: 'Komponenttitestausta',
      author: 'Teppo Testaaja',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
    const likesDiv = blogComponent.find('.likes')
    const authorDiv = blogComponent.find('.authorTitle')


    expect(likesDiv.text()).toContain(5)
    expect(authorDiv.text()).toContain(simpleBlog.author)
    expect(authorDiv.text()).toContain(simpleBlog.title)
  })

  it('notices clicks on button', () => {
    const simpleBlog = {
      title: 'Komponenttitestausta',
      author: 'Teppo Testaaja',
      likes: 5
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(
      <SimpleBlog
        blog={simpleBlog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    /*console.log(blogComponent.debug())*/

    expect(mockHandler.mock.calls.length).toBe(2)

  })
})