/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { ShopReportsTabsValues } from '@constants/tabs/shop-report'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model/data-grid-filter-table-model'
import {
  filterModelInitialValue,
  paginationModelInitialValue,
  sortModelInitialValue,
} from '@models/data-grid-table-model'
import { SellerBoardModel } from '@models/seller-board-model'
import { ShopModel } from '@models/shop-model'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { getClassParams } from './helpers/get-class-params'
import { observerConfig } from './observer.config'

export class ClientShopsViewModel extends DataGridFilterTableModel {
  _tabKey = ShopReportsTabsValues.PPC
  get tabKey() {
    return this._tabKey
  }
  set tabKey(tabKey) {
    this._tabKey = tabKey
  }

  _inventoryProducts: any = []
  get inventoryProducts() {
    return this._inventoryProducts
  }
  set inventoryProducts(inventoryProducts) {
    this._inventoryProducts = inventoryProducts
  }

  _showBindStockGoodsToInventoryModal = false
  get showBindStockGoodsToInventoryModal() {
    return this._showBindStockGoodsToInventoryModal
  }
  set showBindStockGoodsToInventoryModal(showBindStockGoodsToInventoryModal) {
    this._showBindStockGoodsToInventoryModal = showBindStockGoodsToInventoryModal
  }

  _showWarningInfoModal = false
  get showWarningInfoModal() {
    return this._showWarningInfoModal
  }
  set showWarningInfoModal(showWarningInfoModal) {
    this._showWarningInfoModal = showWarningInfoModal
  }

  _showConfirmModal = false
  get showConfirmModal() {
    return this._showConfirmModal
  }
  set showConfirmModal(showConfirmModal) {
    this._showConfirmModal = showConfirmModal
  }

  showSelectShopsModal = false
  shopsData: any = []

  constructor(currentTabsValues: ShopReportsTabsValues) {
    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL, fieldsForSearch, tableKey } =
      getClassParams(currentTabsValues)

    super(getMainDataMethod, columnsModel(), filtersFields, mainMethodURL, fieldsForSearch, tableKey)

    this.getDataGridState()

    makeObservable(this, observerConfig)
  }

  changeTabHandler = (key: ShopReportsTabsValues) => {
    this.tabKey = key

    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL, fieldsForSearch, tableKey } =
      getClassParams(key)

    this.getMainDataMethod = getMainDataMethod
    this.columnsModel = columnsModel()
    this.filtersFields = filtersFields
    this.setColumnMenuSettings(filtersFields)
    this.mainMethodURL = mainMethodURL
    this._tableKey = tableKey
    this.sortModel = sortModelInitialValue
    this.paginationModel = paginationModelInitialValue
    this.filterModel = filterModelInitialValue
    this.fieldsForSearch = fieldsForSearch

    this.getTableData()
  }

  initUserSettings() {
    const url = new URL(window.location.href)
    const currentReport = url.searchParams.get('currentReport') as ShopReportsTabsValues
    const currentShopId = url.searchParams.get('shopId')

    if (!currentReport || !currentShopId) {
      this.getTableData()
      return
    }

    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL, fieldsForSearch, tableKey } =
      getClassParams(currentReport)

    this.getMainDataMethod = getMainDataMethod
    this.columnsModel = columnsModel()
    this.filtersFields = filtersFields
    this._tableKey = tableKey
    this.setColumnMenuSettings(filtersFields)
    this.mainMethodURL = mainMethodURL
    this.fieldsForSearch = fieldsForSearch

    if (currentShopId) {
      this.onChangeFullFieldMenuItem([{ _id: currentShopId }], 'shop')
    }

    if (currentReport) {
      this.tabKey = currentReport
      this.history.push(this.history.location.pathname)
    }

    this.getTableData()
  }

  async moveGoodsToInventoryHandler() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const requestBody = []

      for (const row of this.selectedRows) {
        const selectedRow = this.tableData?.find(item => item._id === row)

        if (selectedRow) {
          requestBody.push({
            shopId: selectedRow?.shop?._id,
            asin: selectedRow?.asin,
            sku: selectedRow?.sku,
            title: selectedRow?.title,
          })
        }
      }

      await SellerBoardModel.createAndLinkSkuProducts({ payload: requestBody })

      this.setRequestStatus(loadingStatuses.SUCCESS)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey.Created),
          buttonText: t(TranslationKey.Ok),
          onSubmit: () => this.onTriggerOpenModal('showWarningInfoModal'),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  deleteReportHandler() {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: true,
        title: t(TranslationKey.Attention),
        message: t(TranslationKey['Are you sure?']),
        onSubmit: () => {
          this.submitDeleteReportHandler()
          this.onTriggerOpenModal('showConfirmModal')
        },
        onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async submitDeleteReportHandler() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await SellerBoardModel.deleteIntegrationsReport(this.tabKey, this.selectedRows)

      await this.getMainTableData()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async bindStockGoodsToInventoryHandler() {
    if (this.tabKey === ShopReportsTabsValues.INVENTORY) {
      await this.getShopsData()

      this.onTriggerOpenModal('showSelectShopsModal')
    } else {
      this.onTriggerOpenModal('showBindStockGoodsToInventoryModal')
    }
  }

  async getProductsMy(filters?: any, isRecCall?: boolean) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await ClientModel.getProductPermissionsData({ filters })

      runInAction(() => {
        this.inventoryProducts = addIdDataConverter(result.rows)
      })

      if (!this.inventoryProducts.length && isRecCall) {
        this.getProductsMy()
      }
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      if (isRecCall) {
        this.setRequestStatus(loadingStatuses.IS_LOADING)

        this.getProductsMy()

        this.setRequestStatus(loadingStatuses.SUCCESS)
      } else {
        runInAction(() => {
          this.inventoryProducts = []
        })
      }
    }
  }

  async submitBindStockGoodsHandler(data: any) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindStockGoodsToInventoryModal')

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['The product is bound']),
          buttonText: t(TranslationKey.Ok),
          onSubmit: () => this.onTriggerOpenModal('showWarningInfoModal'),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey["You can't bind"]),
          buttonText: t(TranslationKey.Ok),
          onSubmit: () => this.onTriggerOpenModal('showWarningInfoModal'),
        }
      })
      this.onTriggerOpenModal('showWarningInfoModal')
      console.log(error)
    }
  }

  async getShopsData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await ShopModel.getMyShopNames()
      runInAction(() => {
        this.shopsData = result
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async bindReportInventoryHandler(shop: { _id: string; name: string }) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await SellerBoardModel.patchReportInventoryProductsLinkSku({ shopIds: [shop._id] })

      this.onTriggerOpenModal('showSelectShopsModal')

      toast.success(`${t(TranslationKey['Integration for'])} ${shop.name} ${t(TranslationKey['has been created'])}`)

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.onTriggerOpenModal('showSelectShopsModal')
      toast.error(t(TranslationKey['Something went wrong']))
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  getTableData() {
    this.getDataGridState()
    this.getMainTableData()
  }
}
