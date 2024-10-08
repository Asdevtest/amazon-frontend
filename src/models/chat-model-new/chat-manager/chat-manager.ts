import { ObservableMap, makeObservable } from 'mobx'

import { WebsocketSpacenameParams } from '@services/websocket/websocket-spacename/types/websocket-spacename.type'

import { EmitsClient } from '../emits-client'
import { Chat, ChatPagination } from '../types/chat.type'
import { ChatMessage } from '../types/message.type'

import { Direction } from './chat-manager.type'
import { observerConfig } from './observer.config'

export class ChatsManager<T> extends EmitsClient<T> {
  chatsManager: ObservableMap<string, Chat> | null = null

  constructor(params: WebsocketSpacenameParams<T>) {
    super(params)

    makeObservable(this, observerConfig)
  }

  setAllChats(chats: Chat[]) {
    chats.forEach(this.addChatToManager)
  }

  addMessagesToChatById(chatId: string, messages: ChatMessage[], addDirection: Direction = Direction.END) {
    const chat = this.chatsManager?.get(chatId)

    if (chat) {
      if (addDirection === Direction.START) {
        chat.messages = [...messages, ...chat.messages]
      } else if (addDirection === Direction.END) {
        chat.messages = [...chat.messages, ...messages]
      }

      this.chatsManager?.set(chatId, chat)
    }
  }

  addChatToManager(chat: Chat) {
    chat.messages = []
    chat.pagination = {
      limit: 20,
      offset: 0,

      hasMoreTop: true,
      hasMoreBottom: false,
    }

    this.chatsManager?.set(chat._id, chat)
  }

  setChatPagination(chatId: string, pagination: ChatPagination) {
    const chat = this.chatsManager?.get(chatId)

    if (chat) {
      chat.pagination = pagination
      this.chatsManager?.set(chatId, chat)
    }
  }
}
