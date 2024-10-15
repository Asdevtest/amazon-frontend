import { Chat } from './types/chat.type'
import { ChatMessage, IncomingMessage, IncomingTypingMessage } from './types/message.type'

export enum ChatListenEvents {
  APP_PONG = 'App:pong',
  CONNECT = 'connect',
  CONNECT_ERRROR = 'connect_error',
  DISCONNECT = 'disconnect',

  CHAT_APP_NEW_MESSAGE = 'Chat:app:new-message',
  CHAT_APP_NEW_CHAT = 'Chat:app:new-chat',
  CHAT_APP_MESSAGE_READ = 'Chat:app:read-message',
  CHAT_APP_MESSAGE_TYPING = 'Chat:app:typing-message',
}

export enum ChatHandlerName {
  onConnect = ChatListenEvents.CONNECT,
  onConnectionError = ChatListenEvents.CONNECT_ERRROR,
  onDisconnect = ChatListenEvents.DISCONNECT,

  onNewMessage = ChatListenEvents.CHAT_APP_NEW_MESSAGE,
  onNewChat = ChatListenEvents.CHAT_APP_NEW_CHAT,
  onReadMessage = ChatListenEvents.CHAT_APP_MESSAGE_READ,
  onTypingMessage = ChatListenEvents.CHAT_APP_MESSAGE_TYPING,
}

export interface ChatListenEventsHandlers {
  [ChatHandlerName.onConnect]: () => void
  [ChatHandlerName.onConnectionError]: (error: Error) => void
  [ChatHandlerName.onDisconnect]: () => void

  [ChatHandlerName.onNewMessage]: (message: IncomingMessage) => void
  [ChatHandlerName.onNewChat]: (chat: Chat) => void
  [ChatHandlerName.onReadMessage]: (message: ChatMessage) => void
  [ChatHandlerName.onTypingMessage]: (message: IncomingTypingMessage) => void
}
