/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { Manager, Socket } from 'socket.io-client'

import { UserModel } from '@models/user-model'

import { observerConfig } from './observer.config'
import { ChatHandlerName, WebsocketChatServiceHandlers } from './types/default-service-handlers.type'
import { WebsocketEmit } from './types/emits.type'
import { WebsocketNamespace, WebsocketSpacenameParams } from './types/websocket-spacename.type'

export class WebsocketSpacename<T> {
  public socket = {} as Socket
  private manager: Manager
  private namespace: WebsocketNamespace

  private handlersToRegister: T
  private defaultHandlersToRegister: WebsocketChatServiceHandlers

  constructor({ manager, namespace, handlers }: WebsocketSpacenameParams<T>) {
    makeObservable(this, observerConfig)

    this.manager = manager
    this.namespace = namespace
    this.handlersToRegister = handlers

    this.defaultHandlersToRegister = {
      [ChatHandlerName.onConnect]: () => this.onConnect(),
      [ChatHandlerName.onDisconnect]: () => this.onDisconnect(),
      [ChatHandlerName.onConnectionError]: (error: Error) => this.onError(error),
    }
  }

  public async init() {
    const socket = await this.manager.socket(this.namespace, {
      auth: { token: UserModel.accessToken },
    })

    runInAction(() => {
      this.socket = socket
    })

    this.registerHandlers(this.handlersToRegister)
    this.registerHandlers(this.defaultHandlersToRegister)
  }

  private registerHandlers(handlers: T | WebsocketChatServiceHandlers) {
    if (!handlers) {
      return
    }

    const handlerKeys = Object.keys(handlers)

    for (const handlerKey of handlerKeys) {
      const handlerCallback = handlers[handlerKey as keyof (T | WebsocketChatServiceHandlers)]
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

  private onConnect() {
    console.warn('Socket connected')
  }

  private onDisconnect() {
    console.warn('Socket disconnected')
  }

  private onError(error: Error) {
    console.warn('Socket error', error)
  }
}
