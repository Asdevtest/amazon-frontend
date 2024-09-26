import { Manager } from 'socket.io-client'

export enum DefaultChatListenEvents {
  APP_PONG = 'App:pong',
  CONNECT = 'connect',
  CONNECT_ERRROR = 'connect_error',
  DISCONNECT = 'disconnect',
}

export interface WebsocketChatResponse<T> {
  data?: T
  error?: string | null
  success: boolean
}

export interface WebsocketSpacenameParams<T> {
  manager: Manager
  namespace: WebsocketNamespace
  handlers: T
}

export enum WebsocketNamespace {
  USERS = '/users',
}
