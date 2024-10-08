import { Manager, Socket } from 'socket.io-client'

import { BACKEND_WEBSOCKET_CHAT_URL } from '@constants/keys/env'

import { ChatMessagesType } from '@models/chat-model/contracts/chat-messages-type'

import { ChatHandlerName, handlerToEventMapping } from './event-handler-mappings'
import { EentToEmit } from './event-to-emit'
import {
  AddUsersToGroupChatParams,
  Chat,
  ChatMessage,
  ChatMessageDataAddUsersToGroupChat,
  ChatMessageUsers,
  FindChatMessageRequestParams,
  NewInfoGroupChatParams,
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
        // console.warn(
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
  }

  public async getUnreadMessagesCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        EentToEmit.GET_UNREAD_MESSAGES_COUNT,
        null,
        (getChatsResponse: WebsocketChatResponse<number>) => {
          if (!getChatsResponse.success || !getChatsResponse.data) {
            reject(getChatsResponse.error)
          } else {
            resolve(getChatsResponse.data)
          }
        },
      )
    })
  }

  public async getChats(crmItemId?: string | null, crmItemType?: string | null): Promise<Chat[]> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        crmItemType ? EentToEmit.GET_CHATS : EentToEmit.GET_SIMPLE_CHATS,
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

  public async getChatMessages(
    chatId?: string | null,
    offset?: number,
    limit?: number,
    messageId?: string,
  ): Promise<ChatMessagesType> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        EentToEmit.GET_CHAT_MESSAGES,
        { chatId, offset, limit, messageId },
        (getChatsResponse: WebsocketChatResponse<ChatMessagesType>) => {
          if (!getChatsResponse.success || !getChatsResponse.data) {
            reject(getChatsResponse.error)
          } else {
            resolve(getChatsResponse.data)
          }
        },
      )
    })
  }

  public async addUsersToGroupChat(params: AddUsersToGroupChatParams): Promise<ChatMessageUsers[]> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        EentToEmit.ADD_USERS_TO_GROUP_CHAT_BY_ADMIN,
        params,
        (sendMessageResponse: WebsocketChatResponse<ChatMessageDataAddUsersToGroupChat>) => {
          if (!sendMessageResponse.success || !sendMessageResponse.data) {
            reject(sendMessageResponse.error)
          } else {
            // @ts-ignore
            resolve(sendMessageResponse.data.data.users)
          }
        },
      )
    })
  }

  public async removeUsersFromGroupChat(params: RemoveUsersFromGroupChatParams): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        EentToEmit.REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN,
        params,
        (response: WebsocketChatResponse<ChatMessage>) => {
          if (!response.success || !response.data) {
            reject(response.error)
          } else {
            resolve(response.data)
          }
        },
      )
    })
  }

  public async patchInfoGroupChat(params: patchInfoGroupChatParams): Promise<patchInfoGroupChatParams> {
    return new Promise((resolve, reject) => {
      this.socket.emit(EentToEmit.PATCH_CHAT_INFO, params, (data: WebsocketChatResponse<NewInfoGroupChatParams>) => {
        if (!data.success || !data.data) {
          reject(data.error)
        } else {
          resolve(data?.data?.updatedData)
        }
      })
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

  public async readMessage(messageIds: string[]): Promise<null> {
    return new Promise(resolve => {
      this.socket.emit(EentToEmit.READ_MESSAGE, { messageIds }, (sendMessageResponse: WebsocketChatResponse<null>) => {
        if (sendMessageResponse.success) {
          resolve(null)
        }
      })
    })
  }

  public async FindChatMessage(requestParams: FindChatMessageRequestParams): Promise<ChatMessage> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        EentToEmit.FIND_CHAT_MESSAGE,
        requestParams,
        (sendMessageResponse: WebsocketChatResponse<ChatMessage>) => {
          if (!sendMessageResponse.success || !sendMessageResponse.data) {
            reject(sendMessageResponse.error)
          } else {
            resolve(sendMessageResponse.data)
          }
        },
      )
    })
  }
}
