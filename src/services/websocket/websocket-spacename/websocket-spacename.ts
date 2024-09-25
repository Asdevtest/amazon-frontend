/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable } from 'mobx'
import { Manager, Socket } from 'socket.io-client'

import { UserModel } from '@models/user-model'

import { observerConfig } from './observer.config'
import { WebsocketNamespace } from './websocket-spacename.types'

interface WebsocketSpacenameParams<T> {
  namespace: WebsocketNamespace
  handlers: T
}

export class WebsocketSpacename<T> {
  private socket = {} as Socket
  private manager: Manager

  constructor(manager: Manager) {
    this.manager = manager
    makeObservable(this, observerConfig)
  }

  public init({ namespace, handlers }: WebsocketSpacenameParams<T>) {
    this.socket = this.manager.socket(namespace, {
      auth: { token: UserModel.accessToken },
    })

    this.registerHandlers(handlers)
  }

  private registerHandlers(handlers: T) {
    if (!handlers) {
      return
    }

    Object.keys(handlers).forEach(handlerName => {
      const handlerCallback = handlers[handlerName as keyof T]
      if (handlerCallback) {
        this.socket.on(handlerName, handlerCallback as (args: any[]) => void)
      }
    })
  }
}
