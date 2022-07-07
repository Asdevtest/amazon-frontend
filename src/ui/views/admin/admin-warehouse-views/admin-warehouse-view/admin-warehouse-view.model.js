import {makeAutoObservable} from 'mobx'

export class AdminWarehouseViewModel {
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
