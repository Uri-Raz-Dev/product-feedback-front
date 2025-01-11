import { UserCred, userService } from '../../services/user/user.service.local'
import { SET_USER, SET_USERS } from '../reducers/user.reducer'
import { store } from '../store'

export async function loadUsers() {
  try {
    const users = await userService.getUsers()
    store.dispatch({ type: SET_USERS, users })
  } catch (e) {
    console.log((e as Error).message)
    throw new Error("Couldn't load users")
  }
}

export async function loadUser() {
  try {
    const user = await userService.getLoggedinUser()
    store.dispatch({ type: SET_USERS, user })
  } catch (e) {
    console.log((e as Error).message)
    throw new Error("Couldn't load user")
  }
}

export async function login(userCred: UserCred) {
  try {
    const user = await userService.login(userCred)
    store.dispatch({ type: SET_USER, user })
  } catch (e) {
    console.log((e as Error).message)
    throw new Error("Couldn't log in")
  }
}
