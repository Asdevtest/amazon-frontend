import { action, observable } from 'mobx'

export const observerConfig = {
  chatsManager: observable,
  notificationSound: observable,

  setAllChats: action.bound,
  addMessagesToChatById: action.bound,
  addChatToManager: action.bound,
  setChatPagination: action.bound,
  playNotificationSound: action.bound,
  setTypingUser: action.bound,
  checkIsTypingUser: action.bound,
  setLastMessage: action.bound,
  setReplyMessage: action.bound,
  setSelectedMessage: action.bound,
  setForwarderMessages: action.bound,
}
