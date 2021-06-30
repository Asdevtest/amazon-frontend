import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'

export class ClientBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  batches = []

  drawerOpen = false
  selectedRow = null
  modalEditBoxes = false
  rowsPerPage = 5
  paginationPage = 1

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
      this.product = result
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  onChangeModalEditBoxes() {
    this.modalEditBoxes = !this.modalEditBoxes
  }

  onBatchesonClick(index) {
    this.selectedRow = index
  }

  onBatchesonDoubleClick(index) {
    this.selectedRow = index
    this.modalEditBoxes = !this.modalEditBoxes
  }

  onChangePagination(e, value) {
    this.paginationPge = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPge = 1
  }
  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
