import { ObservableMap, makeObservable, runInAction } from 'mobx'

import { WebsocketNamespace } from '@services/websocket/websocket-spacename/types/websocket-spacename.type'
import WebsocketsManager from '@services/websocket/websockets-manager/websockets-manager'

import { ChatsManager } from './chat-manager'
import { ChatHandlerName, ChatListenEventsHandlers } from './chat.type'
import { observerConfig } from './observer.config'
import { Chat } from './types/chat.type'

export class ChatModel extends ChatsManager<ChatListenEventsHandlers> {
  selectedChatId: string = ''

  get chats() {
    return Array.from(this.chatsManager?.values?.() || [])
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
      this.setAllChats(result)
    } catch (error) {
      console.error(error)
    }
  }
}

export const chatModel = new ChatModel()
