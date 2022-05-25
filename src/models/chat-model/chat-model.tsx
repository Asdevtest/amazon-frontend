import {plainToClass} from 'class-transformer'
import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, runInAction} from 'mobx'

import {BACKEND_API_URL} from '@constants/env'

import {OtherModel} from '@models/other-model'
import {UserModel} from '@models/user-model'

import {WebsocketChatService} from '@services/websocket-chat-service'

import {ChatContract, SendMessageRequestParamsContract} from './contracts'
import {ChatMessageContract, TChatMessageDataUniversal} from './contracts/chat-message.contract'

const websocketChatServiceIsNotInitializedError = new Error('websocketChatService is not  onotialized')
const noTokenProvidedError = new Error('no access token in user model, login before useing websocket')

class ChatModelStatic {
  private websocketChatService?: WebsocketChatService // Do not init websocket on model create
  public isConnected?: boolean // undefined in case if not initilized

  public chats: ChatContract[] = []

  public loadedFiles: string[] = []

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
  }

  public async getChats(crmItemId: string, crmItemType: string): Promise<void> {
    if (!this.websocketChatService) {
      return
    }
    try {
      console.log('crmItemId, crmItemType ', crmItemId, crmItemType)
      console.log('getChats')
      const getChatsResult = await this.websocketChatService.getChats(crmItemId, crmItemType)
      console.log('getChatsResult ', getChatsResult)
      runInAction(() => {
        this.chats = plainToClass(ChatContract, getChatsResult).map((chat: ChatContract) => ({
          ...chat,
          messages: chat.messages,
        }))
      })

      console.log('this.chats', this.chats)
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
      const imageFile: any = await OtherModel.postImage(formData)
      this.loadedFiles.push(BACKEND_API_URL + '/uploads/' + imageFile.data.fileName)
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

    const paramsWithLoadedFiles = {...params, files: this.loadedFiles}
    this.loadedFiles = []

    await transformAndValidate(SendMessageRequestParamsContract, paramsWithLoadedFiles)

    const sendMessageResult = await this.websocketChatService.sendMessage(paramsWithLoadedFiles)
    return plainToClass(ChatMessageContract, sendMessageResult)
  }

  private onConnectionError(error: Error) {
    console.warn('onConnectionError error ', error)
    this.isConnected = false
  }

  private onNewMessage(newMessage: ChatMessageContract) {
    const message = plainToClass<ChatMessageContract<TChatMessageDataUniversal>, unknown>(
      ChatMessageContract,
      newMessage,
    )
    const findChatIndexById = this.chats.findIndex((chat: ChatContract) => chat._id === message.chatId)

    if (findChatIndexById !== -1) {
      runInAction(() => {
        this.chats[findChatIndexById].messages = [
          ...this.chats[findChatIndexById].messages.filter(mes => mes._id !== message._id),
          message,
        ]
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

  public resetChats() {
    this.chats = []
  }
}

export const ChatModel = new ChatModelStatic()
