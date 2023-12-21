import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SellerBoardModel } from '@models/seller-board-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'

import { clientLast30DaySellerBoardColumns } from '@components/table/table-columns/client/client-last-30-day-seller-board-columns copy'

import { addIdDataConverter, stockReportDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'

export class GoodsDaysReportModel {
  history = undefined
  requestStatus = undefined

  currentShop = undefined

  sellerBoardLast30DayData = []
  drawerOpen = false

  shopsData = []

  selectedRows = []

  showSuccessModal = false
  showConfirmModal = false

  sortModel = []
  filterModel = { items: [] }
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientLast30DaySellerBoardColumns()

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  successModalText = ''

  confirmModalSettings = {
    isWarning: false,
    title: '',
    message: '',
    onSubmit: () => {},
    onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
  }

  constructor({ history, curShop }) {
    this.history = history

    this.currentShop = curShop

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_LAST_30_DAY_SELLER_BOARD)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_LAST_30_DAY_SELLER_BOARD]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.selectedRows = model

    this.setDataGridState()
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  getCurrentData() {
    return toJS(this.sellerBoardLast30DayData)
  }

  onClickShopBtn(shop) {
    this.currentShop = shop ? shop : undefined

    this.getMyDailyReportsLast30Days()
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()
      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getShops()
      this.getMyDailyReportsLast30Days()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  async getMyDailyReportsLast30Days() {
    try {
      const result = await SellerBoardModel.getMyDailyReportsLast30Days(this.currentShop._id)

      runInAction(() => {
        this.sellerBoardLast30DayData = stockReportDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitDeleteRow() {
    try {
      await SellerBoardModel.deleteMyDailyReportsLast30DaysById(this.selectedRows[0])

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')

      runInAction(() => {
        this.successModalText = t(TranslationKey['Row deleted'])
      })
      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
    }
  }

  onClickDeleteBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      title: t(TranslationKey['Delete row from report']),
      message: t(TranslationKey['After confirmation, the row will be deleted. Confirm?']),
      onSubmit: () => {
        this.onSubmitDeleteRow()
      },

      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
