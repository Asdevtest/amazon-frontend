import { makeAutoObservable, runInAction } from 'mobx'

export class ClientSellShopsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
