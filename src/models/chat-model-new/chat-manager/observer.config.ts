import { action, observable } from 'mobx'

export const observerConfig = {
  chatsManager: observable,

  setAllChats: action.bound,
  getChatById: action.bound,
  getAllChats: action.bound,
  addMessagesToChatById: action.bound,
}