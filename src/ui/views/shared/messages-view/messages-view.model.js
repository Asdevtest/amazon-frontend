import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { chatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { ChatsModel } from '@models/chats-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { dataURLtoFile, onSubmitPostImages } from '@utils/upload-files'

export class MessagesViewModel {
  history = undefined
  requestStatus = undefined

  showConfirmModal = false
  showAddNewChatByEmailModal = false
  showAddUsersToGroupChatModal = false
  showWarningInfoModal = false
  showEditGroupChatInfoModal = false

  // chatSelectedId = undefined

  nameSearchValue = ''
  mesSearchValue = ''

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  readyImages = []

  usersData = []

  messagesFound = []
  curFoundedMessage = undefined
  curFoundedMessageIndex = undefined

  showProgress = false

  get chatSelectedId() {
    return ChatModel.chatSelectedId
  }

  get user() {
    return UserModel.userInfo
  }

  get simpleChats() {
    return ChatModel.simpleChats || []
  }

  get typingUsers() {
    return ChatModel.typingUsers || []
  }

  get isMuteChats() {
    return SettingsModel.isMuteChats
  }

  get mutedChats() {
    return SettingsModel.mutedChats
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  get unreadMessages() {
    return ChatModel.unreadMessages
  }

  constructor({ history }) {
    this.history = history

    if (history.location.state?.anotherUserId || history.location.state?.chatId) {
      ChatModel.onChangeChatSelectedId(
        history.location.state?.chatId ||
          this.simpleChats
            .filter(el => el.type === chatsType.DEFAULT)
            .find(el => el.users.map(e => e._id).includes(history.location.state.anotherUserId))?._id,
      )

      if (!this.chatSelectedId) {
        this.showProgress = true

        setTimeout(() => {
          this.showProgress = false
        }, 5000)
      }
    }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.simpleChats,
      () => {
        if (
          history.location.state?.anotherUserId &&
          this.simpleChats.some(el => el.users.map(e => e._id).includes(history.location.state?.anotherUserId))
        ) {
          this.showProgress = false
        }
      },
    )

    // reaction(
    //   () => this.mesSearchValue,
    //   () => {
    //     runInAction(() => {
    //       if (this.mesSearchValue && this.chatSelectedId) {
    //         const mesAr = this.simpleChats
    //           .find(el => el._id === this.chatSelectedId)
    //           .messages.filter(mes => mes.text?.toLowerCase().includes(this.mesSearchValue.toLowerCase()))

    //         this.messagesFound = mesAr

    //         setTimeout(() => this.onChangeCurFoundedMessage(mesAr.length - 1), 0)
    //       } else {
    //         this.curFoundedMessage = undefined

    //         this.messagesFound = []
    //       }
    //     })
    //   },
    // )

    reaction(
      () => ChatModel.isConnected,
      () => this.loadData(),
    )
  }

  onToggleMuteCurrentChat() {
    SettingsModel.onToggleMuteCurrentChat(this.chatSelectedId, this.simpleChats)
  }

  onToggleMuteAllChats() {
    SettingsModel.onToggleMuteAllChats(this.simpleChats)
  }

  async onChangeCurFoundedMessage(index) {
    const curFoundedMessage = this.messagesFound[index]
    await ChatModel.getChatMessage(this.chatSelectedId, undefined, curFoundedMessage)

    runInAction(() => {
      this.curFoundedMessage = curFoundedMessage
      this.curFoundedMessageIndex = index
    })
  }

  async loadData() {
    try {
      await ChatModel.getSimpleChats()
      await ChatModel.getUnreadMessagesCount()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickAddNewChatByEmail() {
    try {
      const res = await ChatsModel.getUsersNames()

      runInAction(() => {
        this.usersData = res.filter(el => el._id !== this.user._id)
      })

      this.onTriggerOpenModal('showAddNewChatByEmailModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickAddUsersToGroupChat() {
    try {
      const res = await ChatsModel.getUsersNames()

      const currentUsersIdsInCurrentChat =
        this.simpleChats.find(el => el._id === this.chatSelectedId)?.users.map(el => el._id) || []

      runInAction(() => {
        this.usersData = res.filter(el => !currentUsersIdsInCurrentChat.includes(el._id) && el._id !== this.user._id)
      })

      this.onTriggerOpenModal('showAddUsersToGroupChatModal')
    } catch (error) {
      console.log(error)
    }
  }

  onClickEditGroupChatInfo() {
    this.onTriggerOpenModal('showEditGroupChatInfoModal')
  }

  async onSubmitAddUsersToGroupChat(users) {
    try {
      this.onTriggerOpenModal('showAddUsersToGroupChatModal')

      await ChatModel.addUsersToGroupChat({ chatId: this.chatSelectedId, users: users.map(el => el._id) })

      // await ChatModel.getSimpleChats()
    } catch (error) {
      console.log(error)
    }
  }

  async onRemoveUsersFromGroupChat(usersIds) {
    try {
      await ChatModel.removeUsersFromGroupChat({ chatId: this.chatSelectedId, users: usersIds })

      // await ChatModel.getSimpleChats()
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitPatchInfoGroupChat(state, sourceState) {
    try {
      this.onTriggerOpenModal('showEditGroupChatInfoModal')

      const imageIsNeedChange = state.preview !== sourceState.preview && state.preview

      if (imageIsNeedChange) {
        const file = dataURLtoFile(state.preview, this.user._id)

        await onSubmitPostImages.call(this, { images: [{ file }], type: 'readyImages' })
      }

      await ChatModel.patchInfoGroupChat({
        chatId: this.chatSelectedId,
        title: state.title,
        image: imageIsNeedChange ? this.readyImages[0] : state.preview,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitAddNewChat(formFields) {
    try {
      if (formFields.chosenUsers.length === 1) {
        const existedChatsUsers = this.simpleChats.reduce(
          (acc, cur) => acc.concat(cur.users.length === 2 ? cur.users.map(user => user._id) : []),
          [],
        )

        if (existedChatsUsers.includes(formFields.chosenUsers[0]?._id)) {
          runInAction(() => {
            this.warningInfoModalSettings = {
              isWarning: false,
              title: t(TranslationKey['Such dialogue already exists']),
            }
          })

          this.onTriggerOpenModal('showWarningInfoModal')
        } else {
          await ChatsModel.createSimpleChatByUserId(formFields.chosenUsers[0]?._id)
        }
      } else {
        if (formFields.images.length) {
          await onSubmitPostImages.call(this, { images: formFields.images, type: 'readyImages' })
        }

        await ChatsModel.createSimpleGroupChat({
          userIds: formFields.chosenUsers.map(el => el._id),
          title: formFields.title,
          image: this.readyImages[0] || '',
        })
      }

      this.onTriggerOpenModal('showAddNewChatByEmailModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTypingMessage(chatId) {
    ChatModel.typingMessage({ chatId })
  }

  muteChatHandler(chatId) {
    SettingsModel.setMutedChat(chatId)
  }

  onClickChat(chat) {
    if (this.chatSelectedId === chat._id) {
      ChatModel.onChangeChatSelectedId(undefined)
    } else {
      ChatModel.onChangeChatSelectedId(chat._id)
    }
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  async onChangeMesSearchValue(e, chatId) {
    runInAction(() => {
      this.mesSearchValue = e.target.value
    })
    if (!e.target.value) {
      runInAction(() => {
        this.messagesFound = []
        this.curFoundedMessage = undefined
        this.curFoundedMessageIndex = undefined
      })
      return
    }
    const res = await ChatModel.FindChatMessage({ chatId, text: e.target.value })
    runInAction(() => {
      this.messagesFound = res
    })
    this.onChangeCurFoundedMessage(res.length - 1)
  }

  async onSubmitMessage(message, files, chatId, replyMessageId) {
    try {
      await ChatModel.sendMessage({
        chatId,
        crmItemId: null,
        text: message,
        files: files?.map(item => item?.file),
        user: {
          name: UserModel.userInfo.name,
          _id: UserModel.userInfo._id,
        },
        ...(replyMessageId && { replyMessageId }),
      })
    } catch (error) {
      console.warn('onSubmitMessage error ', error)
    }
  }

  onClickBackButton() {
    // this.chatSelectedId = undefined

    ChatModel.onChangeChatSelectedId(undefined)
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
