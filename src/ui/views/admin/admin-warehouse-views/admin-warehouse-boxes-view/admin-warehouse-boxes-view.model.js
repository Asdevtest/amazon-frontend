import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {warehouses} from '@constants/warehouses'

import {BoxesModel} from '@models/boxes-model'
import {SettingsModel} from '@models/settings-model'

import {adminBoxesViewColumns} from '@components/table-columns/admin/boxes-columns'

import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class AdminWarehouseBoxesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  boxes = []

  drawerOpen = false
  selectedBoxes = ['2096c_box']
  modalSendOwnProduct = false
  modalEditBox = false
  selectionModel = undefined

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = adminBoxesViewColumns()

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  getCurrentData() {
    return toJS(this.boxes)
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_BOXES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_BOXES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = adminBoxesViewColumns().map(el => ({
        ...el,
        hide: state.columns.lookup[el.field].hide,
      }))
    }
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading
      await this.getBoxes()
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxes()
      runInAction(() => {
        this.boxes = result.map(item => ({
          ...item,
          tmpBarCode: item.items[0].product.barCode,
          tmpAsin: item.items[0].product.id,
          tmpQty: item.items[0].amount,
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

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  onChangeRowsPerPage = e => {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onTriggerCheckbox = boxId => {
    const updatedselectedBoxes = this.selectedBoxes.includes(boxId)
      ? this.selectedBoxes.filter(id => id !== boxId)
      : this.selectedBoxes.concat(boxId)
    this.selectedBoxes = updatedselectedBoxes
  }

  onTriggerModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
