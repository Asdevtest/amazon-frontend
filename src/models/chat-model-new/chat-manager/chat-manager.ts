import { ObservableMap, makeObservable } from 'mobx'

import { WebsocketSpacenameParams } from '@services/websocket/websocket-spacename/types/websocket-spacename.type'

import { EmitsClient } from '../emits-client'
import { Chat, ChatPagination } from '../types/chat.type'
import { ChatMessage, IncomingTypingMessage } from '../types/message.type'

import { Direction } from './chat-manager.type'
import { observerConfig } from './observer.config'

export class ChatsManager<T> extends EmitsClient<T> {
  chatsManager: ObservableMap<string, Chat> | null = null
  notificationSound: HTMLAudioElement = new Audio(`${process.env.PUBLIC_URL}/assets/sounds/notice3.mp3`)

  constructor(params: WebsocketSpacenameParams<T>) {
    super(params)
    makeObservable(this, observerConfig)
  }

  setAllChats(chats: Chat[]) {
    chats.forEach(this.addChatToManager)
  }

  addMessagesToChatById(
    chatId: string,
    messages: ChatMessage[] | ChatMessage,
    addDirection: Direction = Direction.END,
  ) {
    const chat = this.chatsManager?.get(chatId)

    const messagesArray = Array.isArray(messages) ? messages : [messages]

    if (chat) {
      if (addDirection === Direction.START) {
        chat.messages = [...messagesArray, ...chat.messages]
      } else if (addDirection === Direction.END) {
        chat.messages = [...chat.messages, ...messagesArray]
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

  playNotificationSound(chatId: string) {
    const chat = this.chatsManager?.get(chatId)

    if (!chat || chat?.muted) {
      return
    }

    this.notificationSound.play()
  }

  setTypingUser(typingMessage: IncomingTypingMessage, typingValue: boolean) {
    const chat = this.chatsManager?.get(typingMessage?.chatId)

    if (!chat) {
      return
    }

    chat.users?.forEach((user, index) => {
      if (user?._id === typingMessage?.user?._id) {
        const currentUser = chat.users[index]

        currentUser.typing = typingValue
        currentUser.lastSeen = typingMessage?.user?.lastSeen
      }
    })
  }

  checkIsTypingUser(typingMessage: IncomingTypingMessage) {
    const chatId = typingMessage?.chatId
    const userId = typingMessage?.user?._id

    const chat = this.chatsManager?.get(chatId)

    if (!chat) {
      return false
    }

    return chat.users?.some(user => user?._id === userId && user?.typing)
  }
}