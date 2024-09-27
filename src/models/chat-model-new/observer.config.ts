import { action, computed } from 'mobx'

export const observerConfig = {
  chats: computed,

  initModel: action.bound,
  destroyModel: action.bound,
  getChats: action.bound,
}
