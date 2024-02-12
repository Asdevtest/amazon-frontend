/* eslint-disable @typescript-eslint/ban-ts-comment */
import { plainToInstance } from 'class-transformer'
import { makeAutoObservable, runInAction } from 'mobx'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { PaginationDirection } from '@constants/pagination/pagination-direction'
import { noticeSound } from '@constants/sounds.js'

import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { WebsocketChatService } from '@services/websocket-chat-service'
import {
  AddUsersToGroupChatParams,
  ChatMessageTextType,
  ChatMessageType,
  EChatInfoType,
  FindChatMessageRequestParams,
  OnReadMessageResponse,
  OnTypingMessageResponse,
  RemoveUsersFromGroupChatParams,
  TypingMessageRequestParams,
  patchInfoGroupChatParams,
} from '@services/websocket-chat-service/interfaces'

import { getTypeAndIndexOfChat } from '@utils/chat'
import { checkIsChatMessageRemoveUsersFromGroupChatContract } from '@utils/ts-checks'

import { ChatContract, SendMessageRequestParamsContract } from './contracts'
import { ChatMessageContract, TChatMessageDataUniversal } from './contracts/chat-message.contract'

const websocketChatServiceIsNotInitializedError = new Error('websocketChatService is not  onotialized')
const noTokenProvidedError = new Error('no access token in user model, login before useing websocket')

class ChatModelStatic {
  private websocketChatService?: WebsocketChatService // Do not init websocket on model create

  public isConnected?: boolean // undefined in case if not initilized

  public chats: ChatContract[] = []

  public simpleChats: ChatContract[] = []

  public messages: ChatContract[] = []

  public loadedFiles: string[] = []
  public loadedImages: string[] = []
  public loadedVideos: string[] = []

  public typingUsers: OnTypingMessageResponse[] = []

  public chatSelectedId: string | undefined = undefined

  private unreadMessagesCount = 0

  get userId() {
    return UserModel.userId
  }

  get unreadMessages() {
    return this.unreadMessagesCount
  }

  get mutedChats() {
    return SettingsModel.mutedChats
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public init(accessToken?: string) {
    if (accessToken || UserModel.accessToken) {
      this.websocketChatService = new WebsocketChatService({
        token: accessToken ? accessToken : UserModel.accessToken || '',
        handlers: {
          onConnect: this.onConnect,
          onConnectionError: this.onConnectionError,
          onNewMessage: this.onNewMessage,
          onNewChat: this.onNewChat,
          onNewOrderDeadlineNotification: this.onNewOrderDeadlineNotification,
          onUserIdea: this.onUserIdea,
          onUserOrdersUpdates: this.onUserOrdersUpdates,
          onReadMessage: this.onReadMessage,
          onTypingMessage: this.onTypingMessage,
          onUserBoxesUpdate: this.onUserBoxesUpdates,
        },
      })
    } else {
      throw noTokenProvidedError
    }
  }

  private async onConnect() {
    this.isConnected = true
    this.ping()
    if (!this.websocketChatService) {
      return
    }
  }

  public async getChats(crmItemId: string, crmItemType: string): Promise<void> {
    if (!this.websocketChatService) {
      return
    }
    try {
      const getChatsResult = await this.websocketChatService.getChats(crmItemId, crmItemType)

      runInAction(() => {
        this.chats = plainToInstance(ChatContract, getChatsResult).map((chat: ChatContract) => ({
          ...chat,
          messages: [],
          pagination: {
            limit: 20,
            offset: 0,
            offsetBottom: 0,
          },
          isAllNextMessagesLoaded: false,
          isAllPreviousMessagesLoaded: true,
        }))
      })
    } catch (error) {
      console.warn(error)
    }
  }

  public async getChatMessages(chatId: string, direction?: PaginationDirection): Promise<void> {
    if (!this.websocketChatService) {
      return
    }
    try {
      const chatTypeAndIndex = getTypeAndIndexOfChat.call(this, chatId)

      if (!chatTypeAndIndex) {
        return
      }

      const { chatType, index } = chatTypeAndIndex

      const { limit, offset, offsetBottom } = this[chatType][index].pagination

      if (direction === PaginationDirection.START) {
        const chatMessages = await this.websocketChatService.getChatMessages(chatId, 0, limit)

        runInAction(() => {
          this[chatType][index] = {
            ...this[chatType][index],
            messages: chatMessages.rows,
            pagination: {
              ...this[chatType][index].pagination,
              offset: limit,
              offsetBottom: 0,
            },
            isAllNextMessagesLoaded: chatMessages.rows.length < limit,
            isAllPreviousMessagesLoaded: true,
          }
        })
      } else if (direction === PaginationDirection.NEXT) {
        if (this[chatType][index].isAllNextMessagesLoaded) return

        const chatMessages = await this.websocketChatService.getChatMessages(chatId, offset, limit)

        const newMessages = chatMessages.rows

        if (!newMessages?.length) {
          runInAction(() => {
            this[chatType][index].isAllNextMessagesLoaded = true
          })
          return
        }

        runInAction(() => {
          this[chatType][index] = {
            ...this[chatType][index],
            messages: [...chatMessages.rows, ...this[chatType][index].messages],
            pagination: {
              ...this[chatType][index].pagination,
              offset: offset + limit,
            },
            isAllNextMessagesLoaded: chatMessages.rows.length < limit,
          }
        })
      } else if (direction === PaginationDirection.PREV) {
        if (this[chatType][index].isAllPreviousMessagesLoaded) return

        let validOffset = offsetBottom - limit
        let validLimit = limit

        if (validOffset < 0) {
          validLimit = limit + validOffset
          validOffset = 0
        }

        const chatMessages = await this.websocketChatService.getChatMessages(chatId, validOffset, validLimit)

        const newMessages = chatMessages.rows

        if (!newMessages?.length) {
          runInAction(() => {
            this[chatType][index].isAllPreviousMessagesLoaded = true
          })
          return
        }

        runInAction(() => {
          this[chatType][index] = {
            ...this[chatType][index],
            messages: [...this[chatType][index].messages, ...chatMessages.rows],
            pagination: {
              ...this[chatType][index].pagination,
              offsetBottom: validOffset,
            },
            isAllPreviousMessagesLoaded: chatMessages.rows.length < limit,
          }
        })
      }
    } catch (error) {
      console.warn(error)
    }
  }

  public async resetChat(chatId: string) {
    if (!this.websocketChatService) {
      return
    }

    const chatTypeAndIndex = getTypeAndIndexOfChat.call(this, chatId)

    if (!chatTypeAndIndex || !chatId) {
      return
    }

    const { chatType, index } = chatTypeAndIndex

    runInAction(() => {
      this[chatType][index] = {
        ...this[chatType][index],
        messages: [],
        pagination: {
          limit: 20,
          offset: 0,
          offsetBottom: 0,
        },
        isAllNextMessagesLoaded: false,
        isAllPreviousMessagesLoaded: true,
      }
    })
  }

  public disconnect() {
    if (!this.websocketChatService) {
      return
    }
    this.websocketChatService.disconnect()
  }

  public async getSimpleChats(): Promise<void> {
    if (!this.websocketChatService) {
      return
    }
    try {
      const getSimpleChatsResult = await this.websocketChatService.getChats()
      runInAction(() => {
        this.simpleChats = plainToInstance(ChatContract, getSimpleChatsResult).map((chat: ChatContract) => ({
          ...chat,
          messages: [],
          pagination: {
            limit: 20,
            offset: 0,
            offsetBottom: 0,
          },
          isAllNextMessagesLoaded: false,
          isAllPreviousMessagesLoaded: true,
        }))
      })
    } catch (error) {
      console.warn(error)
    }
  }

  public async getUnreadMessagesCount(messagesNumber?: number): Promise<void> {
    if (!this.websocketChatService) {
      return
    }
    try {
      if (messagesNumber || messagesNumber === 0) {
        runInAction(() => {
          this.unreadMessagesCount = Number(this.unreadMessagesCount) + messagesNumber
        })
      } else {
        const count = await this.websocketChatService.getUnreadMessagesCount()
        runInAction(() => {
          this.unreadMessagesCount = count
        })
      }
    } catch (error) {
      console.warn(error)
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
        this.loadedImages.push(fileUrl)
      } else if (fileData.type.startsWith('video')) {
        this.loadedVideos.push(fileUrl)
      } else {
        this.loadedFiles.push(fileUrl)
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async sendMessage(params: SendMessageRequestParamsContract) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    if (params.files?.length) {
      for (const file of params.files) {
        if (typeof file === 'string') {
          this.loadedVideos.push(file)
        } else {
          await this.onPostFile(file?.file)
        }
      }
    }

    const messageWithoutFiles = {
      ...params,
      files: [],
      images: this.loadedImages,
      video: this.loadedVideos,
    }

    if (params.text || this.loadedImages.length || this.loadedVideos.length) {
      await this.websocketChatService.sendMessage(messageWithoutFiles)
    }

    if (this.loadedFiles.length) {
      const messageWithFiles = {
        chatId: params.chatId,
        crmItemId: params.crmItemId,
        text: '',
        files: this.loadedFiles,
        user: params.user,
        replyMessageId: params.replyMessageId,
      }

      await this.websocketChatService.sendMessage(messageWithFiles)
    }

    this.loadedVideos = []
    this.loadedImages = []
    this.loadedFiles = []
  }

  public async getChatMessage(
    chatId: string,
    messageId?: string,
  ): Promise<void | {
    isExist: boolean
    messageIndex: number
  }> {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    const chatTypeAndIndex = getTypeAndIndexOfChat.call(this, chatId)

    if (!chatTypeAndIndex) {
      return
    }

    const { chatType, index } = chatTypeAndIndex

    if (!messageId) return
    const messageIndex = this.findMessageIndex(this[chatType][index].messages, messageId)

    if (messageIndex !== -1) {
      return {
        isExist: true,
        messageIndex,
      }
    } else {
      const chatMessageOffset = await this.getMessageOffset(chatId, messageId)
      const limit = 40

      const chatMessages = await this.websocketChatService.getChatMessages(chatId, chatMessageOffset - limit / 2, limit)

      runInAction(() => {
        this[chatType][index] = {
          ...this[chatType][index],
          messages: chatMessages.rows,
          pagination: {
            ...this[chatType][index].pagination,
            offset: chatMessageOffset + limit / 2,
            offsetBottom: chatMessageOffset - limit / 2,
          },
          isAllNextMessagesLoaded: chatMessages.rows?.length < limit,
          isAllPreviousMessagesLoaded: false,
        }
      })

      const newMessageIndex = this.findMessageIndex(chatMessages.rows, messageId)

      if (newMessageIndex !== -1) {
        return {
          isExist: false,
          messageIndex: newMessageIndex,
        }
      }
    }
  }

  private findMessageIndex(messages: ChatMessageContract[], messageId: string) {
    return messages?.findIndex(el => el._id === messageId)
  }

  private async getMessageOffset(chatId: string, messageId: string): Promise<number> {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    const chatMessage = await this.websocketChatService.getChatMessages(chatId, undefined, undefined, messageId)
    const chatMessageOffset = chatMessage.offset

    return chatMessageOffset
  }

  public async addUsersToGroupChat(params: AddUsersToGroupChatParams) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    try {
      const addedUsers = await this.websocketChatService.addUsersToGroupChat(params)
      const chatTypeAndIndex = getTypeAndIndexOfChat.call(this, params.chatId)
      if (!chatTypeAndIndex) {
        return
      }
      const { chatType, index } = chatTypeAndIndex
      runInAction(() => {
        // @ts-ignore
        this[chatType][index].users = [...this[chatType][index].users, ...addedUsers]
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async removeUsersFromGroupChat(params: RemoveUsersFromGroupChatParams) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    try {
      this.websocketChatService.removeUsersFromGroupChat(params)
      const chatTypeAndIndex = getTypeAndIndexOfChat.call(this, params.chatId)
      if (!chatTypeAndIndex) {
        return
      }
      const { chatType, index } = chatTypeAndIndex

      runInAction(() => {
        this[chatType][index].users = this[chatType][index].users.filter(el => !params.users.includes(el._id))
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async patchInfoGroupChat(params: patchInfoGroupChatParams) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    try {
      const newInfo = await this.websocketChatService.patchInfoGroupChat(params)

      const chatTypeAndIndex = getTypeAndIndexOfChat.call(this, params.chatId)
      if (!chatTypeAndIndex) {
        return
      }
      const { chatType, index } = chatTypeAndIndex

      runInAction(() => {
        // @ts-ignore
        this[chatType][index] = {
          ...this[chatType][index],
          info: {
            ...this[chatType][index].info,
            ...newInfo,
          },
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async typingMessage(params: TypingMessageRequestParams) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }
    await this.websocketChatService.typingMessage(params)
    // return plainToInstance(ChatMessageContract, sendMessageResult)
  }

  public async readMessages(chatId: string, messageIds: string[]) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    const chatTypeAndIndex = getTypeAndIndexOfChat.call(this, chatId)

    if (!chatTypeAndIndex) {
      return
    }

    const { chatType, index } = chatTypeAndIndex

    runInAction(() => {
      this[chatType][index] = {
        ...this[chatType][index],
        messages: this[chatType][index].messages.map(mes => {
          return messageIds.includes(mes._id) ? { ...mes, isRead: true } : mes
        }),
        unread: '0',
      }
    })

    await this.websocketChatService.readMessage(messageIds)

    if (chatType === 'simpleChats') {
      this.getUnreadMessagesCount(-messageIds?.length)
    }
  }

  private onConnectionError(error: Error) {
    console.warn('onConnectionError error ', error)
    this.isConnected = false
  }

  private onNewOrderDeadlineNotification(notification: object[]) {
    SettingsModel.setSnackNotifications({ key: snackNoticeKey.ORDER_DEADLINE, notice: notification })
  }

  private onUserIdea(notification: object[]) {
    SettingsModel.setSnackNotifications({ key: snackNoticeKey.IDEAS, notice: notification })
  }

  private onUserOrdersUpdates(notification: object[]) {
    SettingsModel.setSnackNotifications({ key: snackNoticeKey.ORDERS_UPDATES, notice: notification })
  }

  private onUserBoxesUpdates(notification: object[]) {
    SettingsModel.setSnackNotifications({ key: snackNoticeKey.BOXES_UPDATES, notice: notification })
  }

  private onNewMessage(newMessage: ChatMessageContract) {
    if (
      newMessage.type === ChatMessageType.SYSTEM &&
      newMessage?.info?.type !== EChatInfoType.GROUP &&
      window?.location?.pathname.includes('/messages')
    ) {
      this.getSimpleChats()
    }

    const message = plainToInstance<ChatMessageContract<TChatMessageDataUniversal>, unknown>(
      ChatMessageContract,
      newMessage,
    )

    const isCurrentUser = message.user?._id === this.userId

    if (!isCurrentUser && message.type === ChatMessageType.USER && !this.mutedChats.includes(message.chatId)) {
      SettingsModel.setSnackNotifications({ key: snackNoticeKey.SIMPLE_MESSAGE, notice: message })

      noticeSound.play()
    }

    const chatTypeAndIndex = getTypeAndIndexOfChat.call(this, message.chatId)

    if (!chatTypeAndIndex) {
      return
    }

    const { chatType, index } = chatTypeAndIndex

    runInAction(() => {
      this[chatType][index] = {
        ...this[chatType][index],
        unread:
          isCurrentUser || this[chatType][index]._id === this.chatSelectedId
            ? this[chatType]?.[index]?.unread
            : `${Number(this[chatType]?.[index]?.unread) + 1}`,
        messages: [...this[chatType][index].messages.filter(mes => mes._id !== message._id), message],
        lastMessage: message,
      }
    })

    this.removeTypingUser(message.chatId, message.userId)

    if (
      checkIsChatMessageRemoveUsersFromGroupChatContract(message) &&
      this.userId &&
      message.data?.users?.map(el => el._id).includes(this.userId)
    ) {
      runInAction(() => {
        this.chatSelectedId = undefined

        this.simpleChats = this.simpleChats.filter(el => el._id !== message.chatId)
      })
    }

    const isSystemNotification = [
      ChatMessageTextType.ADD_USERS_TO_GROUP_CHAT_BY_ADMIN,
      ChatMessageTextType.REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN,
      ChatMessageTextType.PATCH_INFO,
    ].some(messageTextType => message.text === messageTextType)

    const isAddCounter = !isCurrentUser && !newMessage?.crmItemId && !isSystemNotification

    this.getUnreadMessagesCount(isAddCounter ? 1 : 0)
  }

  public onChangeChatSelectedId(value: string | undefined) {
    this.chatSelectedId = value
  }

  private onReadMessage(response: OnReadMessageResponse) {
    const findChatIndexById = this.chats.findIndex((chat: ChatContract) => chat._id === response.chatId)

    if (findChatIndexById !== -1) {
      runInAction(() => {
        this.chats[findChatIndexById] = {
          ...this.chats[findChatIndexById],
          messages: this.chats[findChatIndexById].messages.map(mes =>
            response.messagesId.includes(mes._id) ? { ...mes, isRead: true } : mes,
          ),
          // @ts-ignore
          lastMessage: response.messagesId.includes(this.simpleChats[findChatIndexById]?.lastMessage?._id)
            ? { ...this.simpleChats[findChatIndexById]?.lastMessage, isRead: true }
            : this.simpleChats[findChatIndexById]?.lastMessage,
        }
      })
    }

    const findSimpleChatIndexById = this.simpleChats.findIndex((chat: ChatContract) => chat._id === response.chatId)

    if (findSimpleChatIndexById !== -1) {
      runInAction(() => {
        this.simpleChats[findSimpleChatIndexById] = {
          ...this.simpleChats[findSimpleChatIndexById],
          messages: this.simpleChats[findSimpleChatIndexById].messages.map(mes =>
            response.messagesId.includes(mes._id) ? { ...mes, isRead: true } : mes,
          ),
          // @ts-ignore
          lastMessage: response.messagesId.includes(this.simpleChats[findSimpleChatIndexById]?.lastMessage?._id)
            ? { ...this.simpleChats?.[findSimpleChatIndexById]?.lastMessage, isRead: true }
            : this.simpleChats?.[findSimpleChatIndexById]?.lastMessage,
        }
      })
    }
  }

  private removeTypingUser(chatId: string, userId: string) {
    const typingUserToRemove = this.typingUsers.findIndex(el => el.chatId === chatId && el.userId === userId)

    runInAction(() => {
      this.typingUsers.splice(typingUserToRemove, 1)
    })
  }

  private onTypingMessage(response: OnTypingMessageResponse) {
    runInAction(() => {
      this.typingUsers = [...this.typingUsers, response]
    })

    setTimeout(() => {
      this.removeTypingUser(response.chatId, response.userId)
    }, 10000)
  }

  private onNewChat(newChat: ChatContract) {
    const path = window?.location?.pathname

    if (!path.includes('/messages')) {
      return
    }

    this.getSimpleChats()

    const chat = plainToInstance<ChatContract, unknown>(ChatContract, newChat)

    const findSimpleChatIndexById = this.chats.findIndex((ch: ChatContract) => ch._id === newChat._id)

    if (findSimpleChatIndexById !== -1) {
      runInAction(() => {
        this.simpleChats = [...this.simpleChats, chat]
      })
    }
  }

  public ping() {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }
    this.websocketChatService.ping()
  }

  public resetChats() {
    this.chats = []
  }

  public async FindChatMessage(requestParams: FindChatMessageRequestParams) {
    if (!this.websocketChatService) throw websocketChatServiceIsNotInitializedError
    try {
      const messages = await this.websocketChatService.FindChatMessage(requestParams)
      return messages
    } catch (error) {
      console.warn(error)
    }
  }
}

export const ChatModel = new ChatModelStatic()
