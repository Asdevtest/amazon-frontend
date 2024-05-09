/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

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

import { loadingStatus } from '@typings/enums/loading-status'
import { ShopReportsTabsValues } from '@typings/enums/shop-report'

import { getClassParams } from './helpers/get-class-params'
import { observerConfig } from './observer.config'

export class ClientShopsViewModel extends DataGridFilterTableModel {
  tabKey = ShopReportsTabsValues.PPC_ORGANIC_BY_DAY

  inventoryProducts: any = []

  showBindStockGoodsToInventoryModal = false

  showWarningInfoModal = false

  showConfirmModal = false

  showSelectShopsModal = false
  shopsData: any = []

  constructor(currentTabsValues: ShopReportsTabsValues) {
    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL, fieldsForSearch, tableKey } =
      getClassParams(currentTabsValues)

    super({
      getMainDataMethod,
      columnsModel: columnsModel(),
      filtersFields,
      mainMethodURL,
      fieldsForSearch,
      tableKey,
    })

    this.tabKey = currentTabsValues
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
    this.tableKey = tableKey
    this.sortModel = sortModelInitialValue
    this.paginationModel = paginationModelInitialValue
    this.filterModel = filterModelInitialValue
    this.fieldsForSearch = fieldsForSearch
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
    this.tableKey = tableKey
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
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const requestBody = []

      for (const row of this.selectedRows) {
        const selectedRow = this.currentData?.find(item => item._id === row)

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

      this.setRequestStatus(loadingStatus.SUCCESS)

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
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
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
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await SellerBoardModel.deleteIntegrationsReport(this.tabKey, this.selectedRows)

      await this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
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
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await ClientModel.getProductPermissionsData({ filters })

      runInAction(() => {
        this.inventoryProducts = addIdDataConverter(result.rows)
      })

      if (!this.inventoryProducts.length && isRecCall) {
        this.getProductsMy()
      }
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      if (isRecCall) {
        this.setRequestStatus(loadingStatus.IS_LOADING)

        this.getProductsMy()

        this.setRequestStatus(loadingStatus.SUCCESS)
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
      console.error(error)
    }
  }

  async getShopsData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await ShopModel.getMyShopNames()
      runInAction(() => {
        this.shopsData = result
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async bindReportInventoryHandler(shop: { _id: string; name: string }) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await SellerBoardModel.patchReportInventoryProductsLinkSku({ shopIds: [shop._id] })

      this.onTriggerOpenModal('showSelectShopsModal')

      toast.success(`${t(TranslationKey['Integration for'])} ${shop.name} ${t(TranslationKey['has been created'])}`)

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.onTriggerOpenModal('showSelectShopsModal')
      toast.error(t(TranslationKey['Something went wrong']))
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  getTableData() {
    this.getDataGridState()
    this.getCurrentData()
  }
}
