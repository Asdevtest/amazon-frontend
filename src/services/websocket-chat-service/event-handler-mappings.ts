import { objectFlip } from '@utils/object'

export enum ChatEventListenName {
  APP_PONG = 'App:pong',
  CONNECT = 'connect',
  CONNECT_ERRROR = 'connect_error',
  CHAT_APP_NEW_MESSAGE = 'Chat:app:new-message',
  CHAT_APP_NEW_CHAT = 'Chat:app:new-chat',
  CHAT_APP_MESSAGE_READ = 'Chat:app:read-message',
  CHAT_APP_MESSAGE_TYPING = 'Chat:app:typing-message',

  NOTICE_USER_NEW_ORDER_DEADLINE_NOTICE = 'Notify:User:order-deadline',
  NOTICE_USER_IDEA = 'Notify:User:idea',
  NOTICE_USER_ORDERS_UPDATES = 'Notify:User:order',
  NOTICE_USER_BOXES_UPDATES = 'Notify:User:box',
}

export enum ChatHandlerName {
  onPong = 'onPong',
  onConnect = 'onConnect',
  onConnectionError = 'onConnectionError',
  onNewMessage = 'onNewMessage',
  onNewOrderDeadlineNotification = 'onNewOrderDeadlineNotification',
  onUserIdea = 'onUserIdea',
  onUserOrdersUpdates = 'onUserOrdersUpdates',
  onNewChat = 'onNewChat',
  onReadMessage = 'onReadMessage',
  onTypingMessage = 'onTypingMessage',
  onUserBoxesUpdate = 'onUserBoxesUpdate',
}

export const eventToHandlerMapping: Record<ChatEventListenName, ChatHandlerName> = {
  [ChatEventListenName.APP_PONG]: ChatHandlerName.onPong,
  [ChatEventListenName.CONNECT]: ChatHandlerName.onConnect,
  [ChatEventListenName.CONNECT_ERRROR]: ChatHandlerName.onConnectionError,
  [ChatEventListenName.CHAT_APP_NEW_MESSAGE]: ChatHandlerName.onNewMessage,

  [ChatEventListenName.NOTICE_USER_NEW_ORDER_DEADLINE_NOTICE]: ChatHandlerName.onNewOrderDeadlineNotification,
  [ChatEventListenName.NOTICE_USER_IDEA]: ChatHandlerName.onUserIdea,
  [ChatEventListenName.NOTICE_USER_ORDERS_UPDATES]: ChatHandlerName.onUserOrdersUpdates,
  [ChatEventListenName.NOTICE_USER_BOXES_UPDATES]: ChatHandlerName.onUserBoxesUpdate,

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
