import { makeObservable } from 'mobx'

import {
  WebsocketChatResponse,
  WebsocketSpacenameParams,
} from '@services/websocket/websocket-spacename/types/websocket-spacename.type'
import { WebsocketSpacename } from '@services/websocket/websocket-spacename/websocket-spacename'

import { ChatEmits } from '../types/chat-emits.type'
import { Chat } from '../types/chat.type'
import { ChatMessage, ResponseChats, SendMessage, emitSendMessage } from '../types/message.type'

import { observerConfig } from './observer.config'

export class EmitsClient<T> extends WebsocketSpacename<T> {
  constructor(params: WebsocketSpacenameParams<T>) {
    super(params)

    makeObservable(this, observerConfig)
  }

  public async emitGetChats(crmItemId?: string, crmItemType?: string): Promise<Chat[]> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        crmItemType ? ChatEmits.GET_CHATS : ChatEmits.GET_SIMPLE_CHATS,
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

  public async emitGetChatMessages(
    chatId?: string | null,
    offset?: number,
    limit?: number,
    messageId?: string,
  ): Promise<ResponseChats<ChatMessage[]>> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        ChatEmits.GET_CHAT_MESSAGES,
        { chatId, offset, limit, messageId },
        (getChatsResponse: WebsocketChatResponse<ResponseChats<ChatMessage[]>>) => {
          if (!getChatsResponse.success || !getChatsResponse.data) {
            reject(getChatsResponse.error)
          } else {
            resolve(getChatsResponse.data)
          }
        },
      )
    })
  }

  public async emitSendMessage(params: emitSendMessage): Promise<ChatMessage> {
    return new Promise((resolve, reject) => {
      this.socket.emit(ChatEmits.SEND_MESSAGE, params, (sendMessageResponse: WebsocketChatResponse<ChatMessage>) => {
        if (!sendMessageResponse.success || !sendMessageResponse.data) {
          reject(sendMessageResponse.error)
        } else {
          resolve(sendMessageResponse.data)
        }
      })
    })
  }

  public async emitTypingMessage(chatId: string) {
    return new Promise(() => {
      this.socket.emit(ChatEmits.TYPING_MESSAGE, { chatId })
    })
  }
}
