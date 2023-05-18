import { makeAutoObservable, runInAction } from 'mobx'

export class AdminWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickTasks() {
    this.history.push({
      pathname: '/admin/warehouse/tasks',
    })
  }

  onClickBoxes() {
    this.history.push({
      pathname: '/admin/warehouse/boxes',
    })
  }

  // onClickDestinations() {
  //   this.history.push({
  //     pathname: '/admin/warehouse/destinations',
  //   })
  // }
}
