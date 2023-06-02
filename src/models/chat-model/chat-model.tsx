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
  patchInfoGroupChatParams,
  RemoveUsersFromGroupChatParams,
  TypingMessageRequestParams,
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

  public typingUsers: OnTypingMessageResponse[] = []

  public chatSelectedId: string | undefined = undefined

  get userId() {
    return UserModel.userId
  }

  get unreadMessages() {
    return this.simpleChats.reduce(
      (ac, cur) =>
        (ac += cur.messages?.length
          ? cur.messages.reduce((a, c) => (a += !c.isRead && c.user?._id !== this.userId ? 1 : 0), 0)
          : 0),
      0,
    )
  }

  get noticeOfSimpleChats() {
    return SettingsModel.noticeOfSimpleChats
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public init() {
    if (UserModel.accessToken) {
      this.websocketChatService = new WebsocketChatService({
        token: UserModel.accessToken,
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
      // console.log('crmItemId, crmItemType ', crmItemId, crmItemType)
      // console.log('getChats')
      const getChatsResult = await this.websocketChatService.getChats(crmItemId, crmItemType)
      console.log('getChatsResult ', getChatsResult)
      runInAction(() => {
        this.chats = plainToInstance(ChatContract, getChatsResult).map((chat: ChatContract) => ({
          ...chat,
          messages: chat.messages,
        }))
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
      // console.log('getSimpleChats')

      const getSimpleChatsResult = await this.websocketChatService.getChats()
      runInAction(() => {
        this.simpleChats = plainToInstance(ChatContract, getSimpleChatsResult).map((chat: ChatContract) => ({
          ...chat,
          messages: chat.messages,
        }))
      })

      console.log('getSimpleChatsResult', getSimpleChatsResult)
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
      this.loadedFiles.push(BACKEND_API_URL + '/uploads/' + fileName)
    } catch (error) {
      console.log('error', error)
    }
  }

  public async sendMessage(params: SendMessageRequestParamsContract) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }

    // console.log('***SEND_MESSAGE', params)

    if (params.files?.length) {
      for (let i = 0; i < params.files.length; i++) {
        const file: File = params.files[i]

        await this.onPostFile(file)
      }
    }

    const paramsWithLoadedFiles = { ...params, files: this.loadedFiles }

    this.loadedFiles = []

    await transformAndValidate(SendMessageRequestParamsContract, paramsWithLoadedFiles)

    const sendMessageResult = await this.websocketChatService.sendMessage(paramsWithLoadedFiles)
    return plainToInstance(ChatMessageContract, sendMessageResult)
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
    // console.log('***TYPING_MESSAGE!!!')
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
          this.chats[findChatIndexById].messages = [
            ...this.chats[findChatIndexById].messages.map(mes =>
              mes._id !== messageId ? mes : { ...mes, isRead: true },
            ),
          ]
        })
      }

      const findSimpleChatIndexById = this.simpleChats.findIndex((chat: ChatContract) =>
        chat.messages.some(el => el._id === messageId),
      )

      if (findSimpleChatIndexById !== -1) {
        runInAction(() => {
          this.simpleChats[findSimpleChatIndexById].messages = [
            ...this.simpleChats[findSimpleChatIndexById].messages.map(mes =>
              mes._id !== messageId ? mes : { ...mes, isRead: true },
            ),
          ]
        })
      }
    }

    await this.websocketChatService.readMessage(messageIds)
  }

  private onConnectionError(error: Error) {
    console.warn('onConnectionError error ', error)
    this.isConnected = false
  }

  private onNewOrderDeadlineNotification(notification: object[]) {
    // console.log('notification', notification)

    SettingsModel.setSnackNotifications({ key: snackNoticeKey.ORDER_DEADLINE, notice: notification })
  }

  private onUserIdea(notification: object[]) {
    // console.log('notification', notification)

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
      // console.log('SYS')

      this.getSimpleChats()
    }

    const message = plainToInstance<ChatMessageContract<TChatMessageDataUniversal>, unknown>(
      ChatMessageContract,
      newMessage,
    )

    // console.log('***NEW_MESSAGE_IS_COME!!!', message)

    const findChatIndexById = this.chats.findIndex((chat: ChatContract) => chat._id === message.chatId)

    if (findChatIndexById !== -1) {
      runInAction(() => {
        this.chats[findChatIndexById].messages = [
          ...this.chats[findChatIndexById].messages.filter(mes => mes._id !== message._id),
          message,
        ]
      })
    }

    const findSimpleChatIndexById = this.simpleChats.findIndex((chat: ChatContract) => chat._id === message.chatId)

    if (message.user?._id !== this.userId && message.type === ChatMessageType.USER) {
      SettingsModel.setSnackNotifications({ key: snackNoticeKey.SIMPLE_MESSAGE, notice: message })
    }

    if (findSimpleChatIndexById !== -1) {
      // console.log('***NEW_MESSAGE_IS_COME!!!', message)

      if (this.noticeOfSimpleChats && message.user?._id !== this.userId) {
        noticeSound.play()

        // SettingsModel.setSnackNotifications({key: snackNoticeKey.SIMPLE_MESSAGE, notice: message})
      }

      runInAction(() => {
        this.simpleChats[findSimpleChatIndexById].messages = [
          ...this.simpleChats[findSimpleChatIndexById].messages.filter(mes => mes._id !== message._id),
          message,
        ]
      })

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
    }
  }

  public onChangeChatSelectedId(value: string | undefined) {
    runInAction(() => {
      this.chatSelectedId = value
    })
  }

  private onReadMessage(response: OnReadMessageResponse) {
    // console.log('***MY_MESSAGE_IS_READ_!!!')

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
  }

  private onTypingMessage(response: OnTypingMessageResponse) {
    // console.log('***ON_TYPING_MESSAGE!!!')

    runInAction(() => {
      this.typingUsers = [...this.typingUsers, response]
    })

    setTimeout(() => {
      const typingUserToRemove = this.typingUsers.findIndex(
        el => el.chatId === response.chatId && el.userId === response.userId,
      )

      runInAction(() => {
        this.typingUsers.splice(typingUserToRemove, 1)
      })
    }, 3000)
  }

  private onNewChat(newChat: ChatContract) {
    // console.log('***ON_NEW_CHAT!!!')
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
