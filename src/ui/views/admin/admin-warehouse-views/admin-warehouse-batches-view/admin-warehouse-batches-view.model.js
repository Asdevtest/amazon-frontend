import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {BATCHES} from '@constants/mocks'

import {AdministratorModel} from '@models/administrator-model'

export class AdminWarehouseBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1

  batches = BATCHES
  showEditBoxesModal = false
  selectedBatchIndex = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getBatchesData()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getBatchesData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      const result = await AdministratorModel.getBatches()
      runInAction(() => {
        this.batches = result
      })
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  onClickTableRow(batch, index) {
    if (this.selectedBatchIndex === index) {
      this.selectedBatchIndex = undefined
    } else {
      this.selectedBatchIndex = index
    }
  }

  onDoubleClickTableRow(batch, index) {
    if (this.selectedBatchIndex === index) {
      this.selectedBatchIndex = undefined
    } else {
      this.selectedBatchIndex = index
      this.onTriggerEditBoxesModal()
    }
  }

  onTriggerEditBoxesModal() {
    this.showEditBoxesModal = !this.showEditBoxesModal
  }

  onChangePage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
