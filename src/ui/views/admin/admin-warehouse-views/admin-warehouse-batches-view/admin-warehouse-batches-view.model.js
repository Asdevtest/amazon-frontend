import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {BATCHES_BOXES_EXAMPLES} from '@constants/mocks'

import {AdministratorModel} from '@models/administrator-model'

export class AdminWarehouseBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  batchesData = [
    [BATCHES_BOXES_EXAMPLES[0], BATCHES_BOXES_EXAMPLES[2]],
    [BATCHES_BOXES_EXAMPLES[1]],
    [BATCHES_BOXES_EXAMPLES[2], BATCHES_BOXES_EXAMPLES[1]],
    [BATCHES_BOXES_EXAMPLES[0]],
  ]

  drawerOpen = false
  selectedBatchIndex = undefined
  showEditBoxesModal = false
  rowsPerPage = 5
  curPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
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

  async getBatchesData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      this.error = undefined
      const result = await AdministratorModel.getBatches() // сейчас этого запроса не существует
      this.product = result
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }
}
