import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  if (action.type === 'BLOG-INIT') {
    return action.data
  }
  if (action.type === 'LIKE') {
    const old = state.filter(a => a.id !==action.blog.id)
    const newState = [...old, action.blog]
    newState.sort((a, b) => b.likes - a.likes)
    return newState
  }
  if (action.type === 'CREATE') {
    console.log('action: ',action)
    console.log('state:', state)
    return [...state, action.blog]
  }

  if (action.type === 'REMOVE') {
    console.log('state:',state)
    console.log('action', action)
    const newState = state.filter(a => a.id !==action.data.id)
    return newState
  }
  return state
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOG-INIT',
      data: blogs
    })
  }
}

export const blogLike = (data) => {
  return async (dispatch) => {
    const likedBlog = { ...data, likes: data.likes +1 }
    const blog = await blogService.update(data.id, likedBlog)
    dispatch({
      type: 'LIKE',
      blog
    })
  }
}

export const blogCreation = (data) => {
  return async (dispatch) => {
    console.log('blogCreation data: ',data)
    const blog = await blogService.create(data)
    console.log('blogi awaitista', blog)
    dispatch({
      type: 'CREATE',
      blog: { ...blog, likes: 0 }
    })
  }
}

export const blogRemove = (data) => {
  return async (dispatch) => {
    console.log('remove data: ',data)
    const blog = await blogService.remove(data.id)
    console.log('blogi: ',blog)
    dispatch({
      type: 'REMOVE',
      data
    })
  }
}


export default blogReducer