import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BatchStatus} from '@constants/batch-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {adminBatchesViewColumns} from '@components/table-columns/admin/admin-batches-columns'

import {warehouseBatchesDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class AdminSentBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''

  currentData = []

  batchesData = []
  batches = []
  selectedBatches = []
  volumeWeightCoefficient = undefined

  curBatch = {}
  showConfirmModal = false
  drawerOpen = false
  isWarning = false
  showBatchInfoModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = adminBatchesViewColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.batches,
      () => (this.currentData = toJS(this.batches)),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    console.log('this.nameSearchValue', this.nameSearchValue)
    console.log('this.batchesData', this.batchesData)

    if (this.nameSearchValue) {
      this.batches = this.batchesData.filter(item =>
        item.originalData.boxes.some(
          box =>
            box.items.some(item =>
              item.product.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
            ) || box.items.some(item => item.product.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase())),
        ),
      )
    } else {
      this.batches = this.batchesBase
    }
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_BATCHES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_BATCHES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = adminBatchesViewColumns(this.rowHandlers).map(el => ({
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

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  onSelectionModel(model) {
    this.selectedBatches = model
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
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
      const result = await BatchesModel.getBatches(BatchStatus.HAS_DISPATCHED)

      runInAction(() => {
        this.batchesData = warehouseBatchesDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
        this.batches = warehouseBatchesDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
    } catch (error) {
      console.log(error)
      this.error = error
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
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
