import {makeAutoObservable, runInAction, reaction} from 'mobx'

import {ChatModel} from '@models/chat-model'
import {ChatsModel} from '@models/chats-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

export class MessagesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false
  showConfirmModal = false
  showAddNewChatByEmailModal = false

  chatSelectedId = undefined

  nameSearchValue = ''
  mesSearchValue = ''

  usersData = []
  messagesFound = []

  showProgress = false

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

    if (location.state?.anotherUserId) {
      this.chatSelectedId = this.simpleChats.find(el =>
        el.users.map(e => e._id).includes(location.state.anotherUserId),
      )?._id

      if (!this.chatSelectedId) {
        this.showProgress = true

        setTimeout(() => {
          this.showProgress = false
        }, 5000)
      }
    }

    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => this.simpleChats,
      () => {
        if (
          location.state?.anotherUserId &&
          this.simpleChats.some(el => el.users.map(e => e._id).includes(location.state?.anotherUserId))
        ) {
          this.showProgress = false
        }
      },
    )

    reaction(
      () => this.chatSelectedId,
      () => {
        this.mesSearchValue = ''
      },
    )

    reaction(
      () => this.mesSearchValue,
      () => {
        if ((this.mesSearchValue, this.chatSelectedId)) {
          this.messagesFound = this.simpleChats
            .find(el => el._id === this.chatSelectedId)
            .messages.filter(mes => mes.text.includes(this.mesSearchValue))
        } else {
          this.messagesFound = []
        }
      },
    )
  }

  async loadData() {
    try {
      await ChatModel.getSimpleChats()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickAddNewChatByEmail() {
    try {
      const res = await ChatsModel.getUsersEmails()

      const existedChatsEmails = this.simpleChats.reduce(
        (acc, cur) => acc.concat(cur.users.map(user => user.email)),
        [],
      )

      this.usersData = res.filter(el => !existedChatsEmails.includes(el.email))

      this.onTriggerOpenModal('showAddNewChatByEmailModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitAddNewChat(user) {
    try {
      const response = await ChatsModel.createSimpleChatByUserEmail(user.email)

      console.log('response', response)

      this.onTriggerOpenModal('showAddNewChatByEmailModal')
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

  onChangeMesSearchValue(e) {
    runInAction(() => {
      this.mesSearchValue = e.target.value
    })
  }

  async onSubmitMessage(message, files, chatId) {
    try {
      await ChatModel.sendMessage({
        chatId,
        text: message,
        files: files?.map(item => item?.file),
      })
    } catch (error) {
      console.warn('onSubmitMessage error ', error)
    }
  }

  onClickBackButton() {
    this.chatSelectedId = undefined
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
