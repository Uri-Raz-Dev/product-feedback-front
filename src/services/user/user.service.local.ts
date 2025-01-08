import { storageService } from '../async-storage.service'

export interface User {
  _id: string
  username: string
  name: string
  password?: number
  img: string
  isAdmin?: boolean
}

export interface UserCred {
  username: string
  password: number
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  getUsers,
  getById,
  remove,
  getLoggedinUser,
  login,
}

async function getUsers(): Promise<User[]> {
  const users = await storageService.query<User>('user')
  return users.map((user: User) => {
    delete user.password
    return user
  })
}

async function getById(userId: string): Promise<User> {
  return storageService.get('user', userId)
}

function remove(userId: string): Promise<void> {
  return storageService.remove('user', userId)
}

// async function update({ _id }: Pick<User, '_id'>): Promise<User> {
//   const user = await storageService.get('user', _id)
//   await storageService.put('user', user)

//   const loggedinUser = getLoggedinUser()
//   if (loggedinUser._id === user._id) saveLoggedinUser(user)

//   return user
// }
function getLoggedinUser() {
  const str = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
  return str ? JSON.parse(str) : null
}

async function login(userCred: UserCred): Promise<User | null> {
  const users: User[] = await storageService.query('user')

  const user = users.find(
    (usr) =>
      usr.username === userCred.username && usr.password === userCred.password
  )
  if (!user) {
    return null
  }

  delete user.password

  return saveLoggedinUser(user)
}

function saveLoggedinUser(user: User): User {
  user = {
    _id: user._id,
    username: user.username,
    name: user.name,
    img: user.img,
    isAdmin: user.isAdmin,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}
