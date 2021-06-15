import {makeAutoObservable} from 'mobx'

export class WarehouseCompletedViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  rowsPerPage = 5
  curPage = 1
  showBrowseTaskModal = false
  selectedTaskIndex = null

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onTriggerBrowseTaskModal() {
    this.showBrowseTaskModal = !this.showBrowseTaskModal
  }

  onSelectTaskIndex(index) {
    this.selectedTaskIndex = index
  }
}
