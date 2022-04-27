import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {BatchStatus} from '@constants/batch-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {BatchesModel} from '@models/batches-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {clientBatchesViewColumns} from '@components/table-columns/client/client-batches-columns'

import {clientBatchesDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class ClientAwaitingBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  batches = []
  selectedBatches = []
  curBatch = {}

  drawerOpen = false

  showBatchInfoModal = false
  showConfirmModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientBatchesViewColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_AWAITING_BATCHES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_AWAITING_BATCHES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientBatchesViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectedBatches = model
  }

  getCurrentData() {
    return toJS(this.batches)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getBatches()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  async getBatches() {
    try {
      const batches = await BatchesModel.getBatches(BatchStatus.IS_BEING_COLLECTED)

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.batches = clientBatchesDataConverter(batches, this.volumeWeightCoefficient)
      })
    } catch (error) {
      console.log(error)
      this.error = error

      this.batches = []
    }
  }

  async setCurrentOpenedBatch(row) {
    try {
      this.curBatch = row
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showBatchInfoModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async removeBoxFromBatch(batch) {
    try {
      const boxesToRemoveIds = batch.boxes.map(box => box._id)

      await BatchesModel.removeBoxFromBatch(batch._id, boxesToRemoveIds)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickCancelSendToBatchBtn() {
    try {
      const batches = this.batches.filter(el => this.selectedBatches.includes(el._id))

      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i].originalData

        this.removeBoxFromBatch(batch)
      }

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
