import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'

import { BatchesModel } from '@models/batches-model'
import { UserModel } from '@models/user-model'

import { adminBatchesViewColumns } from '@components/table/table-columns/admin/admin-batches-columns'

import { loadingStatus } from '@typings/enums/loading-status'

export class AdminAwaitingBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  batches = []
  batchesData = []

  selectedBatches = []
  curBatch = {}
  showConfirmModal = false
  isWarning = false
  showBatchInfoModal = false

  showAddOrEditBatchModal = false

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminBatchesViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get currentData() {
    return this.batches
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue.trim()
    })

    if (this.nameSearchValue) {
      runInAction(() => {
        this.batches = this.batchesData.filter(item =>
          item.boxes.some(
            box =>
              box.items.some(item =>
                item.product.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
              ) ||
              box.items.some(item => item.product.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase())),
          ),
        )
      })
    } else {
      runInAction(() => {
        // this.boxes = this.boxesData

        this.getBatches()
      })
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  onPaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBatches = model
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await this.getBatches()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getBatches() {
    try {
      const response = await BatchesModel.getBatches(BatchStatus.IS_BEING_COLLECTED)

      runInAction(() => {
        this.batches = response
        this.batchesData = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async setCurrentOpenedBatch(id, notTriggerModal) {
    try {
      const batch = await BatchesModel.getBatchesByGuid(id)

      runInAction(() => {
        this.curBatch = batch
      })

      if (!notTriggerModal) {
        this.onTriggerOpenModal('showBatchInfoModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
