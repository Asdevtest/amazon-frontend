import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { UserModel } from '@models/user-model'

import { adminBatchesViewColumns } from '@components/table/table-columns/admin/admin-batches-columns'

import { loadingStatus } from '@typings/enums/loading-status'

export class AdminSentBatchesViewModel {
  history = undefined
  requestStatus = undefined

  nameSearchValue = ''

  batchesData = []
  batches = []
  selectedBatches = []

  curBatch = {}
  showConfirmModal = false
  isWarning = false
  showBatchInfoModal = false

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminBatchesViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get platformSettings() {
    return UserModel.platformSettings
  }

  get currentData() {
    return this.batches
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
        // this.batches = this.batchesBase

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
      const response = await BatchesModel.getBatches(BatchStatus.HAS_DISPATCHED)

      runInAction(() => {
        this.batches = response
        this.batchesData = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  setCurrentOpenedBatch(row) {
    try {
      this.curBatch = row

      this.onTriggerOpenModal('showBatchInfoModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmSendToBatchBtn() {
    try {
      const boxesIds = []

      this.batches
        .filter(batch => this.selectedBatches.includes(batch.id))
        .forEach(batch => batch.boxes.forEach(box => boxesIds.push(box._id)))

      await BoxesModel.sendBoxesToBatch(boxesIds)
      runInAction(() => {
        this.selectedBatches = []
      })
      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
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
