import { plainToInstance } from 'class-transformer'
import { transformAndValidate } from 'class-transformer-validator'
import { makeAutoObservable, runInAction } from 'mobx'

import { BACKEND_API_URL } from '@constants/keys/env'
import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { noticeSound } from '@constants/sounds.js'

import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { WebsocketChatService } from '@services/websocket-chat-service'
import {
  AddUsersToGroupChatParams,
  ChatMessageType,
  OnReadMessageResponse,
  OnTypingMessageResponse,
  RemoveUsersFromGroupChatParams,
  TypingMessageRequestParams,
  patchInfoGroupChatParams,
} from '@services/websocket-chat-service/interfaces'

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

  public loadedFiles: string[] = []
  public loadedImages: string[] = []

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
          },
          isAllMessagesLoaded: false,
        }))
      })
    } catch (error) {
      console.warn(error)
    }
  }

  public async getChatMessages(chatId: string, messageId?: string): Promise<void> {
    if (!this.websocketChatService) {
      return
    }
    try {
      const findChatIndexById = this.chats.findIndex((chat: ChatContract) => chat._id === chatId)
      const findSimpleChatIndexById = this.simpleChats.findIndex((chat: ChatContract) => chat._id === chatId)

      if (findChatIndexById === -1 && findSimpleChatIndexById === -1) {
        return
      }

      const index = Math.max(findChatIndexById, findSimpleChatIndexById)
      const chatType = findChatIndexById !== -1 ? 'chats' : 'simpleChats'

      if (this[chatType][index].isAllMessagesLoaded) {
        return
      }

      const { offset, limit } = this[chatType][index].pagination

      const chatMessages = await this.websocketChatService.getChatMessages(chatId, offset, limit, messageId)

      console.log('chatMessages', chatMessages)

      runInAction(() => {
        this[chatType][index] = {
          ...this[chatType][index],
          messages: [...chatMessages.rows, ...this[chatType][index].messages],
          pagination: {
            ...this[chatType][index].pagination,
            offset: offset + limit,
          },
          isAllMessagesLoaded: chatMessages.rows.length < limit,
        }
      })
    } catch (error) {
      console.warn(error)
    }
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
          },
          isAllMessagesLoaded: false,
        }))
      })
    } catch (error) {
      console.warn(error)
    }
  }

  public async getUnreadMessagesCount(): Promise<void> {
    if (!this.websocketChatService) {
      return
    }
    try {
      const count = await this.websocketChatService.getUnreadMessagesCount()

      runInAction(() => {
        this.unreadMessagesCount = count
      })
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
      const fileUrl = BACKEND_API_URL + '/uploads/' + fileName

      if (fileData.type.startsWith('image')) {
        this.loadedImages.push(fileUrl)
      } else {
        this.loadedFiles.push(fileUrl)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  public async sendMessage(params: SendMessageRequestParamsContract) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    if (params.files?.length) {
      for (let i = 0; i < params.files.length; i++) {
        const file: File = params.files[i]

        await this.onPostFile(file)
      }
    }

    const paramsWithLoadedFiles = { ...params, files: this.loadedFiles, images: this.loadedImages }

    this.loadedImages = []
    this.loadedFiles = []

    await transformAndValidate(SendMessageRequestParamsContract, paramsWithLoadedFiles)

    const sendMessageResult = await this.websocketChatService.sendMessage(paramsWithLoadedFiles)
    return plainToInstance(ChatMessageContract, sendMessageResult)
  }

  public async getChatMessage(chatId: string, messageId?: string): Promise<void> {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    const findChatIndexById = this.chats.findIndex((chat: ChatContract) => chat._id === chatId)
    const findSimpleChatIndexById = this.simpleChats.findIndex((chat: ChatContract) => chat._id === chatId)

    if (findChatIndexById === -1 && findSimpleChatIndexById === -1) {
      return
    }

    const index = Math.max(findChatIndexById, findSimpleChatIndexById)
    const chatType = findChatIndexById !== -1 ? 'chats' : 'simpleChats'

    const chatMessage = await this.websocketChatService.getChatMessages(chatId, undefined, undefined, messageId)

    const chatMessageOffset = chatMessage.offset

    if (this[chatType][index].pagination.offset > chatMessageOffset) {
      return
    }

    const { limit } = this[chatType][index].pagination

    const chatMessages = await this.websocketChatService.getChatMessages(chatId, 0, chatMessageOffset + 10)

    runInAction(() => {
      this[chatType][index] = {
        ...this[chatType][index],
        messages: [...chatMessages.rows],
        pagination: {
          ...this[chatType][index].pagination,
          offset: chatMessageOffset + 10,
        },
        isAllMessagesLoaded: chatMessages.rows.length < limit,
      }
    })
  }

  public async addUsersToGroupChat(params: AddUsersToGroupChatParams) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    await this.websocketChatService.addUsersToGroupChat(params)
  }

  public async removeUsersFromGroupChat(params: RemoveUsersFromGroupChatParams) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    await this.websocketChatService.removeUsersFromGroupChat(params)
  }

  public async patchInfoGroupChat(params: patchInfoGroupChatParams) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    await this.websocketChatService.patchInfoGroupChat(params)
  }

  public async typingMessage(params: TypingMessageRequestParams) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }
    await this.websocketChatService.typingMessage(params)
    // return plainToInstance(ChatMessageContract, sendMessageResult)
  }

  public async readMessages(messageIds: string[]) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    for (let i = 0; i < messageIds.length; i++) {
      const messageId = messageIds[i]

      const findChatIndexById = this.chats.findIndex((chat: ChatContract) =>
        chat.messages.some(el => el._id === messageId),
      )

      if (findChatIndexById !== -1) {
        runInAction(() => {
          this.chats[findChatIndexById] = {
            ...this.chats[findChatIndexById],
            messages: [
              ...this.chats[findChatIndexById].messages.map(mes =>
                mes._id !== messageId ? mes : { ...mes, isRead: true },
              ),
            ],
          }
        })
      }

      const findSimpleChatIndexById = this.simpleChats.findIndex((chat: ChatContract) =>
        chat.messages.some(el => el._id === messageId),
      )

      if (findSimpleChatIndexById !== -1) {
        runInAction(() => {
          this.simpleChats[findSimpleChatIndexById] = {
            ...this.simpleChats[findSimpleChatIndexById],
            messages: [
              ...this.simpleChats[findSimpleChatIndexById].messages.map(mes =>
                mes._id !== messageId ? mes : { ...mes, isRead: true },
              ),
            ],
            unread: '0',
          }
        })
      }
    }

    await this.websocketChatService.readMessage(messageIds)
    await this.getUnreadMessagesCount()
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
    if (newMessage.type === ChatMessageType.SYSTEM) {
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

    const findChatIndexById = this.chats.findIndex((chat: ChatContract) => chat._id === message.chatId)
    const findSimpleChatIndexById = this.simpleChats.findIndex((chat: ChatContract) => chat._id === message.chatId)

    if (findChatIndexById === -1 && findSimpleChatIndexById === -1) {
      return
    }

    const index = Math.max(findChatIndexById, findSimpleChatIndexById)
    const chatType = findChatIndexById !== -1 ? 'chats' : 'simpleChats'

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

    this.getUnreadMessagesCount()
  }

  public onChangeChatSelectedId(value: string | undefined) {
    runInAction(() => {
      this.chatSelectedId = value
    })
  }

  private onReadMessage(response: OnReadMessageResponse) {
    const findChatIndexById = this.chats.findIndex((chat: ChatContract) => chat._id === response.chatId)

    if (findChatIndexById !== -1) {
      runInAction(() => {
        this.chats[findChatIndexById].messages = [
          ...this.chats[findChatIndexById].messages.map(mes =>
            response.messagesId.includes(mes._id) ? { ...mes, isRead: true } : mes,
          ),
        ]
      })
    }

    const findSimpleChatIndexById = this.simpleChats.findIndex((chat: ChatContract) => chat._id === response.chatId)

    if (findSimpleChatIndexById !== -1) {
      runInAction(() => {
        this.simpleChats[findSimpleChatIndexById].messages = [
          ...this.simpleChats[findSimpleChatIndexById].messages.map(mes =>
            response.messagesId.includes(mes._id) ? { ...mes, isRead: true } : mes,
          ),
        ]
      })
    }

    this.getUnreadMessagesCount()
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
}

export const ChatModel = new ChatModelStatic()
