import { Manager, Socket } from 'socket.io-client'

import { BACKEND_WEBSOCKET_CHAT_URL } from '@constants/keys/env'

import { ChatHandlerName, handlerToEventMapping } from './event-handler-mappings'
import { EentToEmit } from './event-to-emit'
import {
  AddUsersToGroupChatParams,
  Chat,
  ChatMessage,
  RemoveUsersFromGroupChatParams,
  SendMessageRequestParams,
  TypingMessageRequestParams,
  WebsocketChatResponse,
  WebsocketChatServiceHandlers,
  patchInfoGroupChatParams,
} from './interfaces'

export interface WebsocketChatServiceConstructorParams {
  token: string
  handlers?: WebsocketChatServiceHandlers
}

const websocketChatNamespace = 'users'

export class WebsocketChatService {
  private socket!: Socket
  private manager!: Manager

  constructor({ token, handlers }: WebsocketChatServiceConstructorParams) {
    this.init(token)
    this.registerHandlers(handlers)
  }

  private init(token: string): void {
    this.manager = new Manager(BACKEND_WEBSOCKET_CHAT_URL, {
      secure: true,
      reconnection: true,
      rejectUnauthorized: false,
      reconnectionDelayMax: 10000,
      transports: ['polling', 'websocket'],
    })
    this.socket = this.manager.socket(`/${websocketChatNamespace}`, {
      auth: {
        token,
      },
    })
  }

  private registerHandlers(handlers?: WebsocketChatServiceHandlers) {
    if (!handlers) {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(Object.keys(handlers) as ChatHandlerName[]).forEach((handlerName: ChatHandlerName) => {
      const handlerCallback = handlers[handlerName]
      if (handlerToEventMapping[handlerName] && handlerCallback) {
        // console.log(
        //   `WebsocketChatService registerHandlers, register event: ${handlerToEventMapping[handlerName]} with handler: ${handlerName}`,
        // )
        this.socket.on(handlerToEventMapping[handlerName], handlerCallback)
      }
    })
  }

  public ping(): void {
    this.socket.emit(EentToEmit.PING, {
      example: 'ПРОВЕРКА',
    })
  }

  public disconnect(): void {
    this.socket.disconnect()
    // console.log('IN_DISCONNECT')
  }

  public async getChats(crmItemId?: string | null, crmItemType?: string | null): Promise<Chat[]> {
    // if (!crmItemId || !crmItemType) {
    //   throw new Error('crmItemId and crmItemType should be both in parameters')
    // }
    return new Promise((resolve, reject) => {
      this.socket.emit(
        crmItemType ? EentToEmit.GET_CHATS : EentToEmit.GET_SIMPLE_CHATS,
        // 'Chat:user:get-simple-chats',
        // {crmItemId: null, crmItemType: null},
        { crmItemId, crmItemType },
        (getChatsResponse: WebsocketChatResponse<Chat[]>) => {
          if (!getChatsResponse.success || !getChatsResponse.data) {
            reject(getChatsResponse.error)
          } else {
            resolve(getChatsResponse.data)
          }
        },
      )
    })
  }

  public async addUsersToGroupChat(params: AddUsersToGroupChatParams): Promise<{}> {
    return new Promise((/* resolve, reject*/) => {
      this.socket.emit(
        EentToEmit.ADD_USERS_TO_GROUP_CHAT_BY_ADMIN,
        params,
        // (sendMessageResponse: WebsocketChatResponse<ChatMessage>) => {
        //   if (!sendMessageResponse.success || !sendMessageResponse.data) {
        //     reject(sendMessageResponse.error)
        //   } else {
        //     resolve(sendMessageResponse.data)
        //   }
        // },
      )
    })
  }

  public async removeUsersFromGroupChat(params: RemoveUsersFromGroupChatParams): Promise<{}> {
    return new Promise((/* resolve, reject*/) => {
      this.socket.emit(
        EentToEmit.REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN,
        params,
        //   () => {
        //   resolve(this.getChats())
        // }
      )
    })
  }

  public async patchInfoGroupChat(params: patchInfoGroupChatParams): Promise<{}> {
    return new Promise((/* resolve, reject*/) => {
      this.socket.emit(
        EentToEmit.PATCH_CHAT_INFO,
        params,
        //   () => {
        //   resolve(this.getChats())
        // }
      )
    })
  }

  public async sendMessage(params: SendMessageRequestParams): Promise<ChatMessage> {
    return new Promise((resolve, reject) => {
      this.socket.emit(EentToEmit.SEND_MESSAGE, params, (sendMessageResponse: WebsocketChatResponse<ChatMessage>) => {
        if (!sendMessageResponse.success || !sendMessageResponse.data) {
          reject(sendMessageResponse.error)
        } else {
          resolve(sendMessageResponse.data)
        }
      })
    })
  }

  public async typingMessage(params: TypingMessageRequestParams): Promise<{}> {
    return new Promise(() => {
      this.socket.emit(EentToEmit.TYPING_MESSAGE, params)
    })
  }

  public async readMessage(messageIds: string[]): Promise<ChatMessage> {
    // console.log('***READ_OPPONENT_MESSAGE!!!')

    return new Promise(() => {
      this.socket.emit(EentToEmit.READ_MESSAGE, { messageIds })
    })
  }
}
