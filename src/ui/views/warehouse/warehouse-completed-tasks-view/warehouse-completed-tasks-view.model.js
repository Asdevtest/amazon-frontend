import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

export class WarehouseCompletedViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1
  showBrowseTaskModal = false
  selectedTaskIndex = null

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
