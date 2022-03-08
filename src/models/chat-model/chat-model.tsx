import {plainToClass} from 'class-transformer'
import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, runInAction} from 'mobx'

import {UserModel} from '@models/user-model'

import {WebsocketChatService} from '@services/websocket-chat-service'

import {ChatContract, SendMessageRequestParamsContract} from './contracts'
import {ChatMessageContract} from './contracts/chat-message.contract'

const websocketChatServiceIsNotInitializedError = new Error('websocketChatService is not  onotialized')
const noTokenProvidedError = new Error('no access token in user model, login before useing websocket')

class ChatModelStatic {
  private websocketChatService?: WebsocketChatService // Do not init websocket on model create
  public isConnected?: boolean // undefined in case if not initilized

  public chats: ChatContract[] = []

  constructor() {
    console.log('ChatModelStatic constructor')
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  public init() {
    console.log('ChatModelStatic init')
    if (UserModel.accessToken) {
      this.websocketChatService = new WebsocketChatService({
        token: UserModel.accessToken,
        handlers: {
          onConnect: this.onConnect,
          onConnectionError: this.onConnectionError,
          onPong: this.onPong,
          onNewMessage: this.onNewMessage,
        },
      })
    } else {
      throw noTokenProvidedError
    }
  }

  private async onConnect() {
    console.log('onConnect')
    this.isConnected = true
    this.ping()
    if (!this.websocketChatService) {
      console.warn('onConnect websocketChatService is not initialized')
      return
    }
    try {
      const getChatsResult = await this.websocketChatService.getChats()
      console.log('getChatsResult ', getChatsResult)
      runInAction(() => {
        this.chats = plainToClass(ChatContract, getChatsResult).map((chat: ChatContract) => ({
          ...chat,
          messages: chat.messages.reverse(),
        }))
      })
    } catch (error) {
      console.warn(error)
    }
  }

  public async sendMessage(params: SendMessageRequestParamsContract) {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }
    await transformAndValidate(SendMessageRequestParamsContract, params)
    const sendMessageResult = await this.websocketChatService.sendMessage(params)
    return plainToClass(ChatMessageContract, sendMessageResult)
  }

  private onConnectionError(error: Error) {
    console.warn('onConnectionError error ', error)
    this.isConnected = false
  }

  private onNewMessage(newMessage: ChatMessageContract) {
    const message = plainToClass(ChatMessageContract, newMessage)
    const findChatIndexById = this.chats.findIndex((chat: ChatContract) => chat._id === message.chatId)
    if (findChatIndexById !== -1) {
      runInAction(() => {
        this.chats[findChatIndexById].messages = [...this.chats[findChatIndexById].messages, message]
      })
    }
  }

  private onPong(result: string) {
    console.log('onPong result', result)
  }

  public ping() {
    if (!this.websocketChatService) {
      throw websocketChatServiceIsNotInitializedError
    }
    this.websocketChatService.ping()
  }
}

export const ChatModel = new ChatModelStatic()
