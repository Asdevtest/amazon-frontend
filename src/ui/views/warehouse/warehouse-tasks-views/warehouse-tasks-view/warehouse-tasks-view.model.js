import {makeAutoObservable} from 'mobx'

export class WarehouseTasksViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onClickVacantTask() {
    this.history.push({
      pathname: '/warehouse/tasks/vacant-tasks',
    })
  }

  onClickMyTasks() {
    this.history.push({
      pathname: '/warehouse/tasks/my-tasks',
    })
  }

  onClickCompletedTasks() {
    this.history.push({
      pathname: '/warehouse/tasks/completed-tasks',
    })
  }

  onClickCanceledTasks() {
    this.history.push({
      pathname: '/warehouse/tasks/canceled-tasks',
    })
  }
}
