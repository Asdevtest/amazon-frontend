import { action, observable } from 'mobx'

export const observerConfig = {
  chatsManager: observable,

  initModel: action.bound,
  destroyModel: action.bound,
  getChats: action.bound,
}
