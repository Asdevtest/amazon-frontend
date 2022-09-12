import {makeAutoObservable, runInAction} from 'mobx'

import {ChatModel} from '@models/chat-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

export class MessagesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false
  showConfirmModal = false

  chatSelectedId = undefined

  nameSearchValue = ''

  get user() {
    return UserModel.userInfo
  }

  get simpleChats() {
    return ChatModel.simpleChats || []
  }

  get typingUsers() {
    return ChatModel.typingUsers || []
  }

  get noticeOfSimpleChats() {
    return SettingsModel.noticeOfSimpleChats
  }

  constructor({history, location}) {
    this.history = history

    if (location.state) {
      this.chatSelectedId = this.simpleChats.find(el =>
        el.users.map(e => e._id).includes(location.state.anotherUserId),
      )?._id
    }

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      await ChatModel.getSimpleChats()
    } catch (error) {
      console.log(error)
    }
  }

  onTypingMessage(chatId) {
    ChatModel.typingMessage({chatId})
  }

  onTriggerNoticeOfSimpleChats() {
    SettingsModel.onTriggerNoticeOfSimpleChats()
  }

  onClickChat(chat) {
    if (this.chatSelectedId === chat._id) {
      this.chatSelectedId = undefined
    } else {
      this.chatSelectedId = chat._id
    }
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
