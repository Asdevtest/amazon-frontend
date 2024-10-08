import { ObservableMap, makeObservable, runInAction } from 'mobx'

import { WebsocketNamespace } from '@services/websocket/websocket-spacename/types/websocket-spacename.type'
import WebsocketsManager from '@services/websocket/websockets-manager/websockets-manager'

import { ChatsManager } from './chat-manager'
import { Direction } from './chat-manager/chat-manager.type'
import { ChatHandlerName, ChatListenEventsHandlers } from './chat.type'
import { observerConfig } from './observer.config'
import { Chat } from './types/chat.type'
import { ChatMessage } from './types/message.type'

export class ChatModel extends ChatsManager<ChatListenEventsHandlers> {
  selectedChatId: string = ''
  chatsLoading: boolean = false
  messagesLoading: boolean = false

  get chats() {
    return Array.from(this.chatsManager?.values?.() || [])
  }

  get currentChat() {
    if (!this.selectedChatId) {
      return null
    }
    return this.chatsManager?.get(this.selectedChatId)
  }

  get currentChatMessages() {
    if (!this.selectedChatId) {
      return []
    }
    return this.chatsManager?.get(this.selectedChatId)?.messages
  }

  constructor() {
    super({
      manager: WebsocketsManager.getInstance(),
      namespace: WebsocketNamespace.USERS,

      // @ts-ignore
      handlers: {
        [ChatHandlerName.onConnect]: () => this.getChats(),
      },
    })
    makeObservable(this, observerConfig)
  }

  async initModel() {
    await this.init()
    runInAction(() => {
      this.chatsManager = new ObservableMap()
    })
  }

  destroyModel() {
    this.disconnect()
    this.chatsManager = null
  }

  onClickChat(chat: Chat) {
    runInAction(() => {
      if (this.selectedChatId === chat._id) {
        this.selectedChatId = ''
      } else {
        this.selectedChatId = chat._id
      }
    })
  }

  async getChats() {
    try {
      const result = await this.emitGetChats()
      this.setAllChats(result)
    } catch (error) {
      console.error(error)
    }
  }

  async getChatFirstMessages() {
    try {
      if (!this.currentChat) {
        return
      }

      const chatId = this.currentChat?._id

      const { offset, limit } = this.currentChat.pagination

      const result = await this.emitGetChatMessages(chatId, offset, limit)

      this.addMessagesToChatById(this.selectedChatId, result?.rows)
    } catch (error) {
      console.error(error)
    }
  }

  async getChatMessages(offset: number, limit: number, direction: Direction) {
    try {
      const chatId = this.currentChat?._id

      const result = await this.emitGetChatMessages(chatId, offset, limit)

      this.addMessagesToChatById(this.selectedChatId, result?.rows, direction)
    } catch (error) {
      console.error(error)
    }
  }
}

export const chatModel = new ChatModel()
