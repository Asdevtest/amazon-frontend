import {makeAutoObservable} from 'mobx'

import {ChatModel} from '@models/chat-model'
import {UserModel} from '@models/user-model'

export class MessagesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false
  showConfirmModal = false

  chatSelectedId = undefined

  get user() {
    return UserModel.userInfo
  }

  get chats() {
    return ChatModel.chats || []
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickChat(chat) {
    if (this.chatSelectedId === chat._id) {
      this.chatSelectedId = undefined
    } else {
      this.chatSelectedId = chat._id
    }
  }

  async onSubmitMessage(message, links, files, chatIdId) {
    try {
      await ChatModel.sendMessage({
        chatId: chatIdId,
        text: message,
        files: files?.map(item => item?.file),
      })
    } catch (error) {
      console.warn('onSubmitMessage error ', error)
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
