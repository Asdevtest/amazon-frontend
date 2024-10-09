import { action } from 'mobx'

export const observerConfig = {
  emitGetChats: action.bound,
  emitGetChatMessages: action.bound,
  sendMessage: action.bound,
}
