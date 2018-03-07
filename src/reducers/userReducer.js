import userService from '../services/users'


const userReducer = (state = [], action) => {
  if (action.type === 'INIT') {
    return action.data
  }

  return state
}

export const userInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT',
      data: users
    })
  }
}

export default userReducer