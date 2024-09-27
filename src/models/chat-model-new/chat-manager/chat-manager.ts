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
    chats.forEach(chat => {
      this.chatsManager?.set(chat._id, chat)
    })
  }

  getChatById(chatId: string) {
    return this.chatsManager?.get(chatId)
  }

  addMessagesToChatById(chatId: string, messages: ChatMessage[]) {
    this.chatsManager?.get(chatId)?.messages.push(...messages)
  }

  getAllChats() {
    return Array.from(this.chatsManager?.values?.() || [])
  }
}
