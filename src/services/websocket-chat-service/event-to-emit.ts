export enum EentToEmit {
  PING = 'General:user:ping',
  GET_CHATS = 'Chat:user:get-chats',
  GET_SIMPLE_CHATS = 'Chat:user:get-simple-chats',
  SEND_MESSAGE = 'Chat:user:send-message',
  READ_MESSAGE = 'Chat:user:read-message',
  TYPING_MESSAGE = 'Chat:user:typing-message',
  ADD_USERS_TO_GROUP_CHAT_BY_ADMIN = 'Chat:user:add-users-to-group-chat',
  REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN = 'Chat:user:remove-users-from-group-chat',
  PATCH_CHAT_INFO = 'Chat:user:patch-info',
  GET_CHAT_MESSAGES = 'Chat:user:get-chat-messages',
}
