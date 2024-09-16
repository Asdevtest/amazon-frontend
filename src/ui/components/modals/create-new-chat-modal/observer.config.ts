import { action, computed, observable } from 'mobx'

export const observerConfig = {
  chatName: observable,
  chatImage: observable,
  selectedUsersId: observable,
  closeModalMethod: observable,

  disableCreateButton: computed,
  isChatNameNotChanged: computed,
  isChatImageNotChanged: computed,
  isChatUsersNotChanged: computed,

  onSelectUser: action.bound,
  onDeselectUser: action.bound,
  onChangeChatName: action.bound,
  onChangeChatImage: action.bound,
  createSimpleChat: action.bound,
  createGroupChat: action.bound,
  onClickCreateChat: action.bound,
  uploadChatImage: action.bound,
  getChatUsers: action.bound,
  onSubmitPatchInfoGroupChat: action.bound,
  addUsersToGroupChat: action.bound,
  removeUsersFromGroupChat: action.bound,
  getUsersToAddAndRemove: action.bound,
}
