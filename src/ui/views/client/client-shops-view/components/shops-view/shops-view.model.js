import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'

import { shopsColumns } from '@components/table/table-columns/shops-columns'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'

export class ShopsViewModel {
  history = undefined
  requestStatus = undefined

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
  densityModel = 'compact'
  columnsModel = shopsColumns(this.rowHandlers)
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  openModal = null
  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  confirmModalSettings = {
    isWarning: false,
    title: '',
    message: '',
    onSubmit: () => {},
    onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
  }

  constructor({ history, tabsValues, onChangeTabIndex, onChangeCurShop }) {
    this.history = history

    this.tabsValues = tabsValues
    this.onChangeTabIndex = onChangeTabIndex
    this.onChangeCurShop = onChangeCurShop
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_SHOPS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_SHOPS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
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

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
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
      this.getDataGridState()

      await this.getShops()

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

      this.shopsData = []
    }
  }

  async updateShops() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await ClientModel.updateShops(this.rowSelectionModel)

      this.setRequestStatus(loadingStatuses.success)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey.Updated),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey.Error),
        }
      })
      this.onTriggerOpenModal('showWarningModal')
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async removeShopById() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await ShopModel.removeShopById(this.selectedShop._id)

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onSubmitRemoveShop() {
    try {
      await this.removeShopById()

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  onSubmitShopForm(data, shopId) {
    this.confirmModalSettings = {
      isWarning: false,
      title: t(TranslationKey.Attention),
      message: t(TranslationKey['Are you sure?']),
      onSubmit: () => {
        this.createShop(data, shopId)
        this.onTriggerOpenModal('showAddOrEditShopModal')
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async createShop(data, shopId) {
    try {
      if (shopId) {
        await ShopModel.editShop(shopId, data)

        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title: t(TranslationKey['Store changed']),
          }
        })

        this.onTriggerOpenModal('showWarningModal')
      } else {
        await ShopModel.createShop(data)

        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title: t(TranslationKey['Store created']),
          }
        })
        this.onTriggerOpenModal('showWarningModal')
      }

      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: error.body.message,
        }
      })
      this.onTriggerOpenModal('showWarningModal')
    }
  }

  onClickEditBtn(row) {
    this.selectedShop = row
    this.onTriggerOpenModal('showAddOrEditShopModal')
  }

  onClickRemoveBtn(row) {
    this.selectedShop = row
    this.confirmModalSettings = {
      isWarning: false,
      title: t(TranslationKey.Attention),
      message: t(TranslationKey['Are you sure you want to delete the store?']),
      onSubmit: () => this.onSubmitRemoveShop(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }
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
