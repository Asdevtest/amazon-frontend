import { compareDesc, parseISO } from 'date-fns'
import { ObservableMap, makeObservable, runInAction } from 'mobx'

import { ChatsType } from '@constants/keys/chats'

import { OtherModel } from '@models/other-model'

import { WebsocketNamespace } from '@services/websocket/websocket-spacename/types/websocket-spacename.type'
import WebsocketsManager from '@services/websocket/websockets-manager/websockets-manager'

import { ChatsManager } from './chat-manager'
import { Direction } from './chat-manager/chat-manager.type'
import { ChatHandlerName, ChatListenEventsHandlers } from './chat.type'
import { getSortChats } from './helpers/get-sort-chats'
import { observerConfig } from './observer.config'
import { Chat } from './types/chat.type'
import { ChatMessage, IncomingMessage, IncomingTypingMessage, SendMessage } from './types/message.type'

export class ChatModel extends ChatsManager<ChatListenEventsHandlers> {
  selectedChatId: string = ''
  chatsLoading: boolean = false
  messagesLoading: boolean = false

  showCreateNewChatModal: boolean = false
  showForwardMessagesModal: boolean = false

  typing: boolean = false

  get chats() {
    return getSortChats(Array.from(this.chatsManager?.values?.() || []))
  }

  get currentChat() {
    if (!this.selectedChatId) {
      return null
    }
    return this.chatsManager?.get(this.selectedChatId)
  }

  get currentChatMessages() {
    if (!this.selectedChatId) {
      return []
    }
    return this.chatsManager?.get(this.selectedChatId)?.messages
  }

  constructor() {
    super({
      manager: WebsocketsManager.getInstance(),
      namespace: WebsocketNamespace.USERS,

      // @ts-ignore
      handlers: {
        [ChatHandlerName.onConnect]: () => this.getChats(),

        [ChatHandlerName.onNewChat]: (chat: Chat) => this.getNewChat(chat),
        [ChatHandlerName.onNewMessage]: (message: IncomingMessage) => this.getNewMessage(message),

        [ChatHandlerName.onTypingMessage]: (typingMessage: IncomingTypingMessage) =>
          this.getTypingMessage(typingMessage),
      },
    })
    makeObservable(this, observerConfig)
  }

  async initModel() {
    await this.init()
    runInAction(() => {
      this.chatsManager = new ObservableMap()
    })
  }

  destroyModel() {
    this.disconnect()
    this.chatsManager = null
  }

  onClickChat(chat: Chat) {
    runInAction(() => {
      if (this.selectedChatId === chat._id) {
        this.selectedChatId = ''
      } else {
        this.selectedChatId = chat._id
      }
    })
  }

  async getChats() {
    try {
      const result = await this.emitGetChats()
      this.setAllChats(result)
    } catch (error) {
      console.error(error)
    }
  }

  async getChatFirstMessages() {
    try {
      if (!this.currentChat || this.currentChat?.messages?.length) {
        return
      }

      const chatId = this.currentChat?._id

      const { offset, limit } = this.currentChat.pagination

      const result = await this.emitGetChatMessages(chatId, offset, limit)

      this.addMessagesToChatById(this.selectedChatId, result?.rows)
    } catch (error) {
      console.error(error)
    }
  }

  async getChatMessages(offset: number, limit: number, direction: Direction) {
    try {
      const chatId = this.currentChat?._id

      const result = await this.emitGetChatMessages(chatId, offset, limit)

      this.addMessagesToChatById(this.selectedChatId, result?.rows, direction)
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(key: string, value: boolean) {
    runInAction(() => {
      // @ts-ignore
      this[key] = value
    })
  }

  async sendMessage(params: SendMessage) {
    const { files, replyMessageId, forwardedMessageId }: SendMessage = params

    // const replyMessageId =

    try {
      const images = []
      const video = []
      const uploadedFiles = []

      if (files?.length) {
        for (const file of files) {
          if (typeof file === 'string') {
            video.push(file)
          } else {
            const result = await this.onPostFile(file?.file)

            if (!result) {
              continue
            }

            const type = result.type
            const url = result.url

            if (type === 'image') {
              images.push(url)
            } else if (type === 'video') {
              video.push(url)
            } else {
              uploadedFiles.push(url)
            }
          }
        }
      }

      const messageWithoutFiles = {
        ...params,
        files: [],
        images,
        video,
      }

      if (params.text || images.length || video.length /* || params?.forwardedMessageId */) {
        await this.emitSendMessage(messageWithoutFiles)
      }

      if (uploadedFiles.length) {
        const messageWithFiles = {
          chatId: params.chatId,
          // crmItemId: params.crmItemId,
          files: uploadedFiles,
          // replyMessageId: params.replyMessageId,
        }

        await this.emitSendMessage(messageWithFiles)
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async onPostFile(fileData: File) {
    const formData = new FormData()

    const fileWithoutSpaces = new File([fileData], fileData.name.replace(/ /g, ''), {
      type: fileData.type,
      lastModified: fileData.lastModified,
    })

    formData.append('filename', fileWithoutSpaces)

    try {
      const fileName: string = await OtherModel.postImage(formData)
      const fileUrl = '/uploads/' + fileName

      if (fileData.type.startsWith('image')) {
        return {
          url: fileUrl,
          type: 'image',
        }
      } else if (fileData.type.startsWith('video')) {
        return {
          url: fileUrl,
          type: 'video',
        }
      } else {
        return {
          url: fileUrl,
          type: 'file',
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  getNewMessage(message: IncomingMessage) {
    const chatId = message.chatId

    this.addMessagesToChatById(chatId, message)
    this.playNotificationSound(chatId)
  }

  getTypingMessage(typingMessage: IncomingTypingMessage) {
    this.setTypingUser(typingMessage, true)

    setTimeout(() => {
      this.setTypingUser(typingMessage, false)
    }, 3000)
  }

  onTypingMessage() {
    if (this.typing) {
      return
    }

    this.setTyping(true)

    this.emitTypingMessage(this.currentChat?._id as string)

    setTimeout(() => {
      this.setTyping(false)
    }, 3000)
  }

  setTyping(value: boolean) {
    runInAction(() => {
      this.typing = value
    })
  }

  getNewChat(chat: Chat) {
    this.addChatToManager(chat)
  }

  handleClickForwardMessages() {
    this.onTriggerOpenModal('showForwardMessagesModal', true)
  }

  handleClickForwardMessagesToChat(chat: Chat) {
    const messagesToForward = this.currentChat?.selectedMessages || []

    this.setForwarderMessages(chat?._id, messagesToForward)
    this.onTriggerOpenModal('showForwardMessagesModal', false)
    this.clearSelectedMessage(this.currentChat?._id as string)
    this.onClickChat(chat)
  }
}

export const chatModel = new ChatModel()
