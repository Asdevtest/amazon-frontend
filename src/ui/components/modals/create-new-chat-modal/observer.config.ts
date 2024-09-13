import { action, computed, observable } from 'mobx'

export const observerConfig = {
  chatName: observable,
  chatImage: observable,
  selectedUsersId: observable,
  closeModalMethod: observable,

  disableCreateButton: computed,
  isNoChanges: computed,

  onSelectUser: action.bound,
  onDeselectUser: action.bound,
  onChangeChatName: action.bound,
  onChangeChatImage: action.bound,
  createSimpleChat: action.bound,
  createGroupChat: action.bound,
  onClickCreateChat: action.bound,
  uploadChatImage: action.bound,
  getChatUsers: action.bound,
}
