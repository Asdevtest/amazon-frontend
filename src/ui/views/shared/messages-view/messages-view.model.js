import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { chatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { ChatsModel } from '@models/chats-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'
import { dataURLtoFile, onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

export class MessagesViewModel {
  history = undefined
  requestStatus = loadingStatus.SUCCESS

  showConfirmModal = false
  showAddNewChatByEmailModal = false
  showAddUsersToGroupChatModal = false
  showEditGroupChatInfoModal = false
  showForwardMessagesModal = false

  nameSearchValue = ''
  mesSearchValue = ''

  readyImages = []

  usersData = []

  messagesFound = []
  curFoundedMessage = undefined
  curFoundedMessageIndex = undefined

  showProgress = false

  selectedMessages = []

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

  get unreadMessages() {
    return ChatModel.unreadMessages
  }

  constructor({ history }) {
    this.history = history

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

    reaction(
      () => ChatModel.isConnected,
      () => this.loadData(),
    )
  }

  selectChatHandler() {
    if (this.history.location.state?.anotherUserId || this.history.location.state?.chatId) {
      ChatModel.onChangeChatSelectedId(
        this.history.location.state?.chatId ||
          this.simpleChats
            .filter(el => el.type === chatsType.DEFAULT)
            .find(el => el.users.map(e => e._id).includes(this.history.location.state.anotherUserId))?._id,
      )

      if (!this.chatSelectedId) {
        this.showProgress = true

        setTimeout(() => {
          this.showProgress = false
        }, 3000)
      }
    }
  }

  onToggleMuteCurrentChat() {
    SettingsModel.onToggleMuteCurrentChat(this.chatSelectedId, this.simpleChats)
  }

  onToggleMuteAllChats() {
    SettingsModel.onToggleMuteAllChats(this.simpleChats)
  }

  async onChangeCurFoundedMessage(index) {
    const curFoundedMessage = this.messagesFound[index]

    runInAction(() => {
      this.curFoundedMessage = curFoundedMessage
      this.curFoundedMessageIndex = index
    })
  }

  async loadData() {
    try {
      ChatModel.getUnreadMessagesCount()
      await ChatModel.getSimpleChats()

      this.selectChatHandler()
    } catch (error) {
      console.error(error)
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
      console.error(error)
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
      console.error(error)
    }
  }

  onClickEditGroupChatInfo() {
    this.onTriggerOpenModal('showEditGroupChatInfoModal')
  }

  async onSubmitAddUsersToGroupChat(users) {
    try {
      this.onTriggerOpenModal('showAddUsersToGroupChatModal')

      await ChatModel.addUsersToGroupChat({ chatId: this.chatSelectedId, users: users.map(el => el._id) })
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveUsersFromGroupChat(usersIds) {
    try {
      await ChatModel.removeUsersFromGroupChat({ chatId: this.chatSelectedId, users: usersIds })
    } catch (error) {
      console.error(error)
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
      console.error(error)
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
          toast.warning(t(TranslationKey['Such dialogue already exists']))
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
      console.error(error)
    }
  }

  onTypingMessage(chatId) {
    ChatModel.typingMessage({ chatId })
  }

  muteChatHandler(chatId) {
    SettingsModel.setMutedChat(chatId)
  }

  onClickChat(chat, isNotChangeChat = false) {
    if (this.messagesFound?.length) {
      this.onChangeMesSearchValue('', this.chatSelectedId)
    }

    this.selectedMessages = []

    if (isNotChangeChat) {
      return
    }

    ChatModel.resetChat(this.chatSelectedId)

    if (this.chatSelectedId === chat._id) {
      ChatModel.onChangeChatSelectedId(undefined)
    } else {
      ChatModel.onChangeChatSelectedId(chat._id)
    }
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  async onChangeMesSearchValue(value, chatId) {
    runInAction(() => {
      this.mesSearchValue = value
    })

    if (!value || !chatId) {
      runInAction(() => {
        this.messagesFound = []
        this.curFoundedMessage = undefined
        this.curFoundedMessageIndex = undefined
      })
      return
    }

    this.setRequestStatus(loadingStatus.IS_LOADING)

    const res = await ChatModel.FindChatMessage({ chatId, text: value })

    runInAction(() => {
      this.messagesFound = res
    })

    this.onChangeCurFoundedMessage(res?.length - 1)

    this.setRequestStatus(loadingStatus.SUCCESS)
  }

  async onSubmitMessage(message, files, chatId, replyMessageId, messagesToForward) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ChatModel.sendMessage({
        chatId,
        crmItemId: null,
        text: message,
        files,
        user: {
          name: UserModel.userInfo.name,
          _id: UserModel.userInfo._id,
        },
        ...(replyMessageId && { replyMessageId }),
      })

      if (messagesToForward?.length) {
        console.log('messagesToForward :>> ', messagesToForward)

        for (const message of messagesToForward) {
          console.log('message :>> ', message)

          await ChatModel.sendMessage({
            chatId,
            crmItemId: null,
            text: '',
            user: {
              name: UserModel.userInfo.name,
              _id: UserModel.userInfo._id,
            },
            forwardedMessageId: message._id,
          })
        }
      }

      this.onClickClearForwardMessages({ _id: chatId })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error('onSubmitMessage error ', error)
    }
  }

  getOnlineUsers() {
    ChatModel.getOnlineUsers()
  }

  onClickBackButton() {
    ChatModel.onChangeChatSelectedId(undefined)
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onSelectMessage(message) {
    if (this.selectedMessages.some(el => el?._id === message._id)) {
      this.selectedMessages = this.selectedMessages.filter(el => el?._id !== message?._id)
    } else {
      this.selectedMessages = [...this.selectedMessages, message]
    }
  }

  onClearSelectedMessages() {
    this.selectedMessages = []
  }

  onClickForwardMessages() {
    this.onTriggerOpenModal('showForwardMessagesModal')
  }

  onClickForwardToChat(chat) {
    ChatModel.onClickForwardMessages(chat?._id, this.selectedMessages)
    this.onClickChat(chat, this.chatSelectedId === chat._id)

    this.showForwardMessagesModal = false
  }

  onClickClearForwardMessages(chat) {
    ChatModel.clearMessagesToForward(chat?._id)
  }
}
