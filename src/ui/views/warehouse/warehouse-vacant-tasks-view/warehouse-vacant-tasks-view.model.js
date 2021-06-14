import {makeAutoObservable} from 'mobx'

export class WarehouseDashboardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  rowsPerPage = 5
  curPage = 1
  showEditTaskModal = false
  selectedTaskIndex = null
  showBarcodeModal = false
  showEditBoxModal = false

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

  onTriggerEditTaskModal() {
    this.showEditTaskModal = !this.showEditTaskModal
  }

  onSelectTaskIndex(index) {
    this.selectedTaskIndex = index
  }

  onTriggerShowBarcodeModal() {
    this.showBarcodeModal = !this.showBarcodeModal
  }

  onTriggerShowEditBoxModal() {
    this.showEditBoxModal = !this.showEditBoxModal
  }
}
