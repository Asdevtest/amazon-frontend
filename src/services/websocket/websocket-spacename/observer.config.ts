import { action, observable } from 'mobx'

export const observerConfig = {
  socket: observable,
  manager: observable,
  namespace: observable,
  handlersToRegister: observable,
  defaultHandlersToRegister: observable,

  init: action.bound,

  disconnect: action.bound,

  onConnect: action.bound,
  onDisconnect: action.bound,
  onError: action.bound,

  registerHandlers: action.bound,

  ping: action.bound,
}
