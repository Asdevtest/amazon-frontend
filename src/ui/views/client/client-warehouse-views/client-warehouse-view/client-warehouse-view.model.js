import { makeAutoObservable, runInAction } from 'mobx'

export class ClientWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickInStock() {
    this.history.push({
      pathname: '/client/warehouse/in-stock',
    })
  }

  onClickTasks() {
    this.history.push({
      pathname: '/client/warehouse/tasks',
    })
  }
}
