import { action, observable } from 'mobx'

export const observerConfig = {
  chats: observable,

  setChats: action.bound,
  getChat: action.bound,
  addMessagesToChat: action.bound,
}
