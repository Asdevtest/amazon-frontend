import { DefaultChatListenEvents } from './websocket-spacename.type'

export enum ChatHandlerName {
  onPong = DefaultChatListenEvents.APP_PONG,
  onConnect = DefaultChatListenEvents.CONNECT,
  onConnectionError = DefaultChatListenEvents.CONNECT_ERRROR,
  onDisconnect = DefaultChatListenEvents.DISCONNECT,
}

export interface WebsocketChatServiceHandlers {
  [ChatHandlerName.onConnectionError]: (error: Error) => void
  [ChatHandlerName.onDisconnect]: () => void
}
