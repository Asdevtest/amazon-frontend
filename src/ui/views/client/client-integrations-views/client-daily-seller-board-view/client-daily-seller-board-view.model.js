import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'
import {SellerBoardModel} from '@models/seller-board-model'
import {SettingsModel} from '@models/settings-model'

import {clientDailySellerBoardColumns} from '@components/table-columns/client/client-daily-seller-board-columns'

import {addIdDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class ClientDailySellerBoardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  sellerBoardDailyData = []

  inventoryProducts = []
  drawerOpen = false

  showAddProductSellerboardModal = false
  showBindStockGoodsToInventoryModal = false

  addProductSettings = {
    product: {},
    onSubmit: data => this.onSubmitCreateSinglePermission(data),
  }

  rowHandlers = {
    selectedRow: item => this.onClickRowRadioBtn(item),
  }

  selectedRows = []
  selectedRow = {}
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = clientDailySellerBoardColumns(this.selectedRow, this.rowHandlers)

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_DAILY_SELLER_BOARD)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_DAILY_SELLER_BOARD]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientDailySellerBoardColumns(this.selectedRow, this.rowHandlers).map(el => ({
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

  getCurrentData() {
    return toJS(this.sellerBoardDailyData)
  }

  onClickRowRadioBtn = item => {
    this.selectedRow = item
    this.getDataGridState()
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getMyDailyReports()
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

  onSelectionModel(model) {
    this.selectedRows = model
  }

  async getMyDailyReports() {
    try {
      const result = await SellerBoardModel.getMyDailyReports()

      runInAction(() => {
        this.sellerBoardDailyData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickAddBtn() {
    this.onTriggerOpenModal('showAddProductSellerboardModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async onClickBindStockGoodsToInventoryBtn() {
    try {
      // await this.getProductsMy()
      this.onTriggerOpenModal('showBindStockGoodsToInventoryModal')
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  getInventoryData() {
    return toJS(this.inventoryProducts)
  }

  async getProductsMy() {
    try {
      const result = await ClientModel.getProductsMy()
      runInAction(() => {
        this.inventoryProducts = result.sort(sortObjectsArrayByFiledDate('updatedAt'))
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }
}
