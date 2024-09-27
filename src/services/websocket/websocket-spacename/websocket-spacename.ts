/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { Manager, Socket } from 'socket.io-client'

import { UserModel } from '@models/user-model'

import { observerConfig } from './observer.config'
import { WebsocketEmit } from './types/emits.type'
import { WebsocketNamespace, WebsocketSpacenameParams } from './types/websocket-spacename.type'

export class WebsocketSpacename<T> {
  public socket = {} as Socket
  private manager: Manager
  private namespace: WebsocketNamespace

  private handlersToRegister: T

  constructor({ manager, namespace, handlers }: WebsocketSpacenameParams<T>) {
    makeObservable(this, observerConfig)

    this.manager = manager
    this.namespace = namespace
    this.handlersToRegister = handlers
  }

  public async init() {
    const socket = await this.manager.socket(this.namespace, {
      auth: { token: UserModel.accessToken },
    })

    runInAction(() => {
      this.socket = socket
    })

    this.registerHandlers(this.handlersToRegister)
  }

  private registerHandlers(handlers: T) {
    if (!handlers) {
      return
    }

    const handlerKeys = Object.keys(handlers)

    for (const handlerKey of handlerKeys) {
      const handlerCallback = handlers[handlerKey as keyof T]
      if (handlerCallback) {
        this.socket.on(handlerKey, handlerCallback as (args: any[]) => void)
      }
    }
  }

  public ping(message: string = 'Connected') {
    this.socket.emit(WebsocketEmit.PING, {
      message,
    })
  }

  public disconnect() {
    this.socket.disconnect()
  }
}
