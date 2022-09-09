import {objectFlip} from '@utils/object'

export enum ChatEventListenName {
  APP_PONG = 'App:pong',
  CONNECT = 'connect',
  CONNECT_ERRROR = 'connect_error',
  CHAT_APP_NEW_MESSAGE = 'Chat:app:new-message',
  CHAT_APP_NEW_CHAT = 'Chat:app:new-chat',
  CHAT_APP_MESSAGE_READ = 'Chat:app:read-message',
  CHAT_APP_MESSAGE_TYPING = 'Chat:app:typing-message',
}

export enum ChatHandlerName {
  onPong = 'onPong',
  onConnect = 'onConnect',
  onConnectionError = 'onConnectionError',
  onNewMessage = 'onNewMessage',
  onNewChat = 'onNewChat',
  onReadMessage = 'onReadMessage',
  onTypingMessage = 'onTypingMessage',
}

export const eventToHandlerMapping: Record<ChatEventListenName, ChatHandlerName> = {
  [ChatEventListenName.APP_PONG]: ChatHandlerName.onPong,
  [ChatEventListenName.CONNECT]: ChatHandlerName.onConnect,
  [ChatEventListenName.CONNECT_ERRROR]: ChatHandlerName.onConnectionError,
  [ChatEventListenName.CHAT_APP_NEW_MESSAGE]: ChatHandlerName.onNewMessage,
  [ChatEventListenName.CHAT_APP_NEW_CHAT]: ChatHandlerName.onNewChat,
  [ChatEventListenName.CHAT_APP_MESSAGE_READ]: ChatHandlerName.onReadMessage,
  [ChatEventListenName.CHAT_APP_MESSAGE_TYPING]: ChatHandlerName.onTypingMessage,
}

type InvertResult<T extends Record<PropertyKey, PropertyKey>> = {
  [P in keyof T as T[P]]: P
}

export const handlerToEventMapping: InvertResult<Record<ChatEventListenName, ChatHandlerName>> = objectFlip(
  eventToHandlerMapping,
) as InvertResult<Record<ChatEventListenName, ChatHandlerName>>
