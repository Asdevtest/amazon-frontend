import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BatchStatus } from '@constants/statuses/batch-status'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { adminBatchesViewColumns } from '@components/table/table-columns/admin/admin-batches-columns'

import { warehouseBatchesDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'

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
          item.originalData.boxes.some(
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

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.ADMIN_BATCHES)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.ADMIN_BATCHES)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
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

    this.setDataGridState()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBatches = model
    })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDataGridState()
      await this.getBatches()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getBatches() {
    try {
      const result = await BatchesModel.getBatches(BatchStatus.HAS_DISPATCHED)

      runInAction(() => {
        this.batchesData = warehouseBatchesDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
        this.batches = warehouseBatchesDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
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
        .map(batch => batch.originalData)
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
