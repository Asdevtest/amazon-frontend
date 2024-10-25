import { action, computed, observable } from 'mobx'

export const observerConfig = {
  selectedChatId: observable,
  showCreateNewChatModal: observable,
  showForwardMessagesModal: observable,
  showChatInfo: observable,
  typing: observable,

  chats: computed,
  currentChat: computed,
  currentChatMessages: computed,

  initModel: action.bound,
  destroyModel: action.bound,
  getChats: action.bound,
  getChatMessages: action.bound,
  getChatFirstMessages: action.bound,
  onTriggerOpenModal: action.bound,
  onTypingMessage: action.bound,
  getTypingMessage: action.bound,
  setTyping: action.bound,
  getNewChat: action.bound,
  handleClickForwardMessages: action.bound,
  handleClickForwardMessagesToChat: action.bound,
}
