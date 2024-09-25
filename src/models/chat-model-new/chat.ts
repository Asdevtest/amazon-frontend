import { makeObservable } from 'mobx'

import { WebsocketSpacename } from '@services/websocket/websocket-spacename/websocket-spacename'
import WebsocketsManager from '@services/websocket/websockets-manager/websockets-manager'

import { ChatListenEventsHandlers } from './chat.types'

class ChatNameSpace extends WebsocketSpacename<ChatListenEventsHandlers> {
  constructor() {
    super(WebsocketsManager.getInstance())

    makeObservable(this, {})
  }
}

export const ChatNameSpaceAS = new ChatNameSpace()
