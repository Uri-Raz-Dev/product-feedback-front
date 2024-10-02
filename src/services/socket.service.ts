// import { io } from 'socket.io-client'
// import { userService } from './user.service'

// // Import the Socket type from the socket.io-client
// import type { Socket } from 'socket.io-client'

// import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'

// export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
// export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'
// export const SOCKET_EMIT_SET_TOY = 'chat-set-toy'
// export const SOCKET_EMIT_USER_WATCH = 'user-watch'
// export const SOCKET_EVENT_USER_UPDATED = 'user-updated'
// export const SOCKET_EVENT_REVIEW_ADDED = 'review-added'
// export const SOCKET_EVENT_REVIEW_REMOVED = 'review-removed'
// export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you'

// const SOCKET_EMIT_LOGIN = 'set-user-socket'
// const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

// const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
// export const socketService = createSocketService()
// // export const socketService = createDummySocketService();

// // For debugging from console
// ;(window as any).socketService = socketService

// socketService.setup()

// interface SocketService {
//   setup: () => void
//   on: (eventName: string, cb: (...args: any[]) => void) => void
//   off: (eventName: string, cb?: (...args: any[]) => void) => void
//   emit: (eventName: string, data: any) => void
//   login: (userId: string) => void
//   logout: () => void
//   terminate: () => void
// }

// function createSocketService(): SocketService {
//   let socket: Socket | null = null // Use Socket as a type

//   const socketService: SocketService = {
//     setup() {
//       socket = io(baseUrl) // Use io as a value
//       const user = userService.getLoggedinUser()
//       if (user) this.login(user._id)
//     },
//     on(eventName, cb) {
//       if (socket) {
//         socket.on(eventName, cb)
//       }
//     },
//     off(eventName, cb = null) {
//       if (!socket) return
//       if (!cb) socket.removeAllListeners(eventName)
//       else socket.off(eventName, cb)
//     },
//     emit(eventName, data) {
//       if (socket) {
//         socket.emit(eventName, data)
//       }
//     },
//     login(userId) {
//       if (socket) {
//         socket.emit(SOCKET_EMIT_LOGIN, userId)
//       }
//     },
//     logout() {
//       if (socket) {
//         socket.emit(SOCKET_EMIT_LOGOUT)
//       }
//     },
//     terminate() {
//       socket = null
//     },
//   }
//   return socketService
// }

// function createDummySocketService(): SocketService {
//   let listenersMap: { [key: string]: ((data: any) => void)[] } = {}
//   const socketService: SocketService = {
//     setup() {
//       listenersMap = {}
//     },
//     terminate() {
//       this.setup()
//     },
//     login() {
//       console.log('Dummy socket service here, login - got it')
//     },
//     logout() {
//       console.log('Dummy socket service here, logout - got it')
//     },
//     on(eventName, cb) {
//       listenersMap[eventName] = [...(listenersMap[eventName] || []), cb]
//     },
//     off(eventName, cb) {
//       if (!listenersMap[eventName]) return
//       if (!cb) delete listenersMap[eventName]
//       else
//         listenersMap[eventName] = listenersMap[eventName].filter(
//           (l) => l !== cb
//         )
//     },
//     emit(eventName, data) {
//       let listeners = listenersMap[eventName]
//       if (eventName === SOCKET_EMIT_SEND_MSG) {
//         listeners = listenersMap[SOCKET_EVENT_ADD_MSG]
//       }

//       if (!listeners) return

//       listeners.forEach((listener) => {
//         listener(data)
//       })
//     },
//     testChatMsg() {
//       this.emit(SOCKET_EVENT_ADD_MSG, {
//         from: 'Someone',
//         txt: 'Aha it worked!',
//       })
//     },
//     testUserUpdate() {
//       const user = userService.getLoggedinUser()
//       if (user) {
//         this.emit(SOCKET_EVENT_USER_UPDATED, { ...user, score: 555 })
//       }
//     },
//   }
//   ;(window as any).listenersMap = listenersMap
//   return socketService
// }
