import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'

export class ClientBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  rowsPerPage = 15
  paginationPage = 1

  batches = undefined
  selectedBatchIndex = undefined
  showEditBoxesModal = false

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
    }
  }

  async getBatchesData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined

      const result = await ClientModel.getBatches()

      runInAction(() => {
        this.batches = result
      })

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  onTriggerEditBoxesModal() {
    this.showEditBoxesModal = !this.showEditBoxesModal
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

  onChangePagination(e, value) {
    this.paginationPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPage = 1
  }
  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
