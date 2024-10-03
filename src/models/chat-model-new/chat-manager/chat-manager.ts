import { ObservableMap, makeObservable } from 'mobx'

import { WebsocketSpacenameParams } from '@services/websocket/websocket-spacename/types/websocket-spacename.type'

import { EmitsClient } from '../emits-client'
import { Chat } from '../types/chat.type'
import { ChatMessage } from '../types/message.type'

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

  addMessagesToChatById(chatId: string, messages: ChatMessage[]) {
    const chat = this.chatsManager?.get(chatId)

    if (chat) {
      chat.messages.push(...messages)

      this.chatsManager?.set(chatId, chat)
    }
  }

  addChatToManager(chat: Chat) {
    chat.messages = []
    chat.pagination = {
      limit: 20,
      offset: 0,
      offsetBottom: 0,
      isAllNextMessagesLoaded: false,
      isAllPreviousMessagesLoaded: true,
    }

    this.chatsManager?.set(chat._id, chat)
  }
}
