import { action, computed, observable } from 'mobx'

export const observerConfig = {
  chatName: observable,
  chatImage: observable,
  selectedUsersId: observable,

  disableCreateButton: computed,

  onSelectUser: action.bound,
  onDeselectUser: action.bound,
  onChangeChatName: action.bound,
  onChangeChatImage: action.bound,
  createSimpleChat: action.bound,
  createGroupChat: action.bound,
  onClickCreateChat: action.bound,
}
