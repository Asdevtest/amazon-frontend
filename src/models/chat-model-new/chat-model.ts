import { makeObservable } from 'mobx'

import { WebsocketNamespace } from '@services/websocket/websocket-spacename/types/websocket-spacename.type'
import WebsocketsManager from '@services/websocket/websockets-manager/websockets-manager'

import { ChatsManager } from './chat-manager'
import { ChatListenEventsHandlers } from './chat.type'
import { EmitsClient } from './emits-client'
import { observerConfig } from './observer.config'
import { Chat } from './types/chat.type'

class ChatModelStatic extends EmitsClient<ChatListenEventsHandlers> {
  selectedChatId: string = ''

  chatsManager: ChatsManager | null = null

  constructor() {
    super({
      manager: WebsocketsManager.getInstance(),
      namespace: WebsocketNamespace.USERS,

      // @ts-ignore
      handlers: {},
    })
    makeObservable(this, observerConfig)
  }

  async initModel() {
    await this.init()
    this.getChats()
    this.chatsManager = new ChatsManager()
  }

  destroyModel() {
    this.disconnect()
    if (this.chatsManager) {
      this.chatsManager = null
    }
  }

  onClickChat(chat: Chat) {
    if (this.selectedChatId === chat._id) {
      this.selectedChatId = ''
    } else {
      this.selectedChatId = chat._id
    }
  }

  async getChats() {
    try {
      const result = await this.emitGetChats()
      this.chatsManager?.setChats(result)
    } catch (error) {
      console.error(error)
    }
  }
}

export const ChatModelAs = new ChatModelStatic()
