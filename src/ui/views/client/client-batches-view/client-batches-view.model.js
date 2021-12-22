import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {DeliveryTypeByCode} from '@constants/delivery-options'
import {loadingStatuses} from '@constants/loading-statuses'
import {warehouses} from '@constants/warehouses'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'

import {batchesViewColumns} from '@components/table-columns/batches-columns'

import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class ClientBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  batches = []
  selectedBatches = []
  curBatch = {}

  drawerOpen = false

  showBatchInfoModal = false

  rowHandlers = {
    setCurrentOpenedBatch: row => this.setCurrentOpenedBatch(row),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = batchesViewColumns(this.rowHandlers)

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_BATCHES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_BATCHES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = batchesViewColumns(this.rowHandlers).map(el => ({
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
      const result = await ClientModel.getBatches()

      runInAction(() => {
        this.batches = result.map((item, i) => ({
          ...item,
          id: i,
          tmpDelivery: DeliveryTypeByCode[item.batch.deliveryMethod],
          tmpWarehouses: warehouses[item.batch.warehouse],
          tmpFinalWeight: item.boxes.reduce(
            (prev, box) =>
              (prev =
                prev +
                Math.max(
                  parseFloat(box.volumeWeightKgWarehouse ? box.volumeWeightKgWarehouse : box.volumeWeightKgSupplier) ||
                    0,
                  parseFloat(box.weighGrossKgWarehouse ? box.weighGrossKgWarehouse : box.weighGrossKgSupplier) || 0,
                )),

            0,
          ),
          tmpTotalPrice: item.boxes.reduce((acc, cur) => acc + cur.items[0].product.currentSupplier.lotcost, 0),
        }))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  setCurrentOpenedBatch(row) {
    this.curBatch = row
    this.onTriggerOpenModal('showBatchInfoModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
