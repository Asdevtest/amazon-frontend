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
  curFoundedMessage = undefined

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
    runInAction(() => {
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
    })

    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => this.simpleChats,
      () => {
        if (
          location.state?.anotherUserId &&
          this.simpleChats.some(el => el.users.map(e => e._id).includes(location.state?.anotherUserId))
        ) {
          runInAction(() => {
            this.showProgress = false
          })
        }
      },
    )

    reaction(
      () => this.chatSelectedId,
      () => {
        runInAction(() => {
          this.mesSearchValue = ''
        })
      },
    )

    reaction(
      () => this.mesSearchValue,
      () => {
        runInAction(() => {
          if (this.mesSearchValue && this.chatSelectedId) {
            const mesAr = this.simpleChats
              .find(el => el._id === this.chatSelectedId)
              .messages.filter(mes => mes.text?.toLowerCase().includes(this.mesSearchValue.toLowerCase()))

            this.messagesFound = mesAr

            setTimeout(() => this.onChangeCurFoundedMessage(mesAr.length - 1), 0)
          } else {
            this.curFoundedMessage = undefined

            this.messagesFound = []
          }
        })
      },
    )
  }
  onChangeCurFoundedMessage(index) {
    runInAction(() => {
      this.curFoundedMessage = this.messagesFound[index]
    })
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

      runInAction(() => {
        this.usersData = res.filter(el => !existedChatsEmails.includes(el.email))
      })

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
    runInAction(() => {
      if (this.chatSelectedId === chat._id) {
        this.chatSelectedId = undefined
      } else {
        this.chatSelectedId = chat._id
      }
    })
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
    runInAction(() => {
      this.chatSelectedId = undefined
    })
  }

  onTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }
}
