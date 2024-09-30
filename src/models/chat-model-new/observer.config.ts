import { action, computed, observable } from 'mobx'

export const observerConfig = {
  selectedChatId: observable,

  chats: computed,
  currentChatMessages: computed,

  initModel: action.bound,
  destroyModel: action.bound,
  getChats: action.bound,
  getChatMessages: action.bound,
}
