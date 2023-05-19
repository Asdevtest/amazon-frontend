import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'

import { shopsColumns } from '@components/table/table-columns/shops-columns'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

export class ShopsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tabsValues = undefined
  onChangeTabIndex = undefined
  onChangeCurShop = undefined

  shopsData = []

  drawerOpen = false
  selectedShop = undefined

  selectedShopFilters = []

  showAddOrEditShopModal = false
  showWarningModal = false
  showConfirmModal = false

  rowSelectionModel = []

  activeSubCategory = 0

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),

    onClickSeeStockReport: row => this.onClickSeeStockReport(row),
    onClickSeeGoodsDailyReport: row => this.onClickSeeGoodsDailyReport(row),
  }

  sortModel = []
  filterModel = { items: [] }
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = shopsColumns(this.rowHandlers)
  openModal = null
  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  constructor({ history, tabsValues, onChangeTabIndex, onChangeCurShop, openModal }) {
    this.history = history

    this.tabsValues = tabsValues
    this.onChangeTabIndex = onChangeTabIndex
    this.onChangeCurShop = onChangeCurShop
    this.openModal = openModal
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

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_SHOPS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_SHOPS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = shopsColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  getCurrentData() {
    return toJS(this.selectedShopFilters)
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onChangeDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onClickSeeStockReport(shop) {
    this.onChangeTabIndex(this.tabsValues.STOCK_REPORT)

    this.onChangeCurShop(shop)
  }

  onClickSeeGoodsDailyReport(shop) {
    this.onChangeTabIndex(this.tabsValues.GOODS_DAYS_REPORT)
    this.onChangeCurShop(shop)
  }

  onSelectShopFilter(shop) {
    if (this.selectedShopFilters.some(el => el._id === shop._id)) {
      this.selectedShopFilters = this.selectedShopFilters.filter(el => el._id !== shop._id)
    } else {
      this.selectedShopFilters.push(shop)
    }
  }

  handleSelectAllShops() {
    if (this.selectedShopFilters.length === this.shopsData.length) {
      this.selectedShopFilters = []
    } else {
      this.selectedShopFilters = this.shopsData
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getShops()

      this.getDataGridState()
      this.selectedShopFilters = this.shopsData

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()

      runInAction(() => {
        this.shopsData = addIdDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
      if (this.openModal) {
        this.onTriggerOpenModal('showAddOrEditShopModal')
      }
    } catch (error) {
      console.log(error)
      this.error = error

      this.shopsData = []
    }
  }

  async updateShops() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await ClientModel.updateShops(this.rowSelectionModel)

      this.setRequestStatus(loadingStatuses.success)

      this.warningInfoModalSettings = {
        isWarning: false,
        title: t(TranslationKey.Updated),
      }
      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
      this.error = error

      this.warningInfoModalSettings = {
        isWarning: false,
        title: t(TranslationKey.Error),
      }
      this.onTriggerOpenModal('showWarningModal')
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async removeShopById() {
    try {
      await ShopModel.removeShopById(this.selectedShop._id)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitRemoveShop() {
    try {
      await this.removeShopById()

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitShopForm(data, shopId) {
    try {
      if (shopId) {
        await ShopModel.editShop(shopId, data)

        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Store changed']),
        }
        this.onTriggerOpenModal('showWarningModal')
      } else {
        await ShopModel.createShop(data)

        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Store created']),
        }
        this.onTriggerOpenModal('showWarningModal')
      }

      this.loadData()
      this.onTriggerOpenModal('showAddOrEditShopModal')
    } catch (error) {
      console.log(error)
      this.error = error

      this.warningInfoModalSettings = {
        isWarning: false,
        title: error.body.message,
      }
      this.onTriggerOpenModal('showWarningModal')
    }
  }

  onClickEditBtn(row) {
    this.selectedShop = row
    this.onTriggerOpenModal('showAddOrEditShopModal')
  }

  onClickRemoveBtn(row) {
    this.selectedShop = row
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickAddBtn() {
    this.selectedShop = undefined
    this.onTriggerOpenModal('showAddOrEditShopModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
