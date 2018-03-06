const startingNotification = ''

const notificationReducer = (store = startingNotification, action) => {
  if (action.type === 'NOTIFICATION') {
    return action.content
  }

  return store
}

export const newNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    content: content
  }
}

export const notify = (data, timeParam) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      content: data
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        content: ''
      })
    }, timeParam*1000)
  }
}

export default notificationReducer