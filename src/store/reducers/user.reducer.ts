import { User } from '../../services/user/user.service.local'

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

export interface InitState {
  users: User[]
  user: User
}

export interface UserActions {
  type: string
  user: User
  users: User[]
  userId: string
}

export function userReducer(state: InitState, action: UserActions) {
  let newState = state
  switch (action.type) {
    case SET_USER:
      newState = { ...state, user: action.user }
      break
    case REMOVE_USER:
      newState = {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      }
      break
    case SET_USERS:
      newState = { ...state, users: action.users }
      break
  }
  return newState
}
