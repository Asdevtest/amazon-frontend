import { makeObservable } from 'mobx'

import { Chat } from '../types/chat.type'
import { ChatMessage } from '../types/message.type'

import { observerConfig } from './observer.config'

export class ChatsManager {
  chats: Map<string, Chat>

  constructor() {
    this.chats = new Map()

    makeObservable(this, observerConfig)
  }

  setChats(chats: Chat[]) {
    this.chats = new Map(chats.map(chat => [chat._id, chat]))
  }

  getChat(chatId: string) {
    return this.chats.get(chatId)
  }

  addMessagesToChat(chatId: string, messages: ChatMessage[]) {
    this.chats.get(chatId)?.messages.push(...messages)
  }
}
