import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {warehouses} from '@constants/warehouses'

import {BoxesModel} from '@models/boxes-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'

import {warehouseBoxesViewColumns} from '@components/table-columns/warehouse/warehouse-boxes-columns'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class WarehouseWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  boxes = []
  selectedBoxes = []

  drawerOpen = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = warehouseBoxesViewColumns()

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_BOXES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_BOXES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = warehouseBoxesViewColumns().map(el => ({
        ...el,
        hide: state.columns.lookup[el.field].hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
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
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.boxes)
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
    this.curPage = e.page
  }

  onChangeRowsPerPage = e => {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPage = 1
  }

  async getBatches() {
    try {
      const result = await StorekeeperModel.getBatches()
      const boxes = result.map(batchObj => batchObj.boxes).flat()

      runInAction(() => {
        this.boxes = boxes.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')).map(item => ({
          ...item,
          tmpBarCode: item.items[0].product.barCode,
          tmpAsin: item.items[0].product.id,
          tmpQty: item.items[0].order.amount,
          tmpMaterial: item.items[0].product.material,
          tmpAmazonPrice: item.items[0].product.amazon,
          tmpTrackingNumberChina: item.items[0].order.trackingNumberChina,
          tmpFinalWeight: Math.max(
            parseFloat(item.volumeWeightKgWarehouse ? item.volumeWeightKgWarehouse : item.volumeWeightKgSupplier) || 0,
            parseFloat(
              item.weightFinalAccountingKgWarehouse
                ? item.weightFinalAccountingKgWarehouse
                : item.weightFinalAccountingKgSupplier,
            ) || 0,
          ),
          tmpGrossWeight: item.weighGrossKgWarehouse ? item.weighGrossKgWarehouse : item.weighGrossKgSupplier,
          tmpWarehouses: warehouses[item.warehouse],
        }))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onSelectBox(boxId) {
    if (this.selectedBoxes.includes(boxId)) {
      this.selectedBoxes = this.selectedBoxes.filter(selectedBoxId => selectedBoxId !== boxId)
    } else {
      this.selectedBoxes = [...this.selectedBoxes, boxId]
    }
  }

  async onClickConfirmSendToBatchBtn() {
    try {
      await BoxesModel.sendBoxesToBatch(this.selectedBoxes)
      runInAction(() => {
        this.selectedBoxes = []
      })
      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }
}
