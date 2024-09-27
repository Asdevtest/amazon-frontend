import { action, observable } from 'mobx'

export const observerConfig = {
  socket: observable,
  manager: observable,
  namespace: observable,
  handlersToRegister: observable,

  init: action.bound,

  disconnect: action.bound,

  registerHandlers: action.bound,

  ping: action.bound,
}
