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
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

export class GoodsDaysReportModel {
  history = undefined
  requestStatus = undefined
  error = undefined

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

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = this.columnsModel.map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_LAST_30_DAY_SELLER_BOARD)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_LAST_30_DAY_SELLER_BOARD]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientLast30DaySellerBoardColumns().map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onSelectionModel(model) {
    this.selectedRows = model
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
      this.error = error
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getShops()

      await this.getMyDailyReportsLast30Days()
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

  async getMyDailyReportsLast30Days() {
    try {
      const result = await SellerBoardModel.getMyDailyReportsLast30Days(
        this.currentShop && { shopId: this.currentShop._id },
      )

      runInAction(() => {
        this.sellerBoardLast30DayData = stockReportDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitDeleteRow() {
    try {
      await SellerBoardModel.deleteMyDailyReportsLast30DaysById(this.selectedRows[0])

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')

      this.successModalText = t(TranslationKey['Row deleted'])
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
