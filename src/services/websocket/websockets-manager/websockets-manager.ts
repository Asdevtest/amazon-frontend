import { Manager } from 'socket.io-client'

import { BACKEND_WEBSOCKET_CHAT_URL } from '@constants/keys/env'

class WebsocketsManager {
  private static instance: Manager

  public static getInstance(): Manager {
    if (!this.instance) {
      this.instance = new Manager(BACKEND_WEBSOCKET_CHAT_URL, {
        secure: true,
        reconnection: true,
        rejectUnauthorized: false,
        reconnectionDelayMax: 10000,
        transports: ['polling', 'websocket'],
      })
    }
    return this.instance
  }
}

export default WebsocketsManager
