/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model/data-grid-filter-table-model'
import { filterModelInitialValue, paginationModelInitialValue } from '@models/data-grid-table-model'
import { SellerBoardModel } from '@models/seller-board-model'
import { ShopModel } from '@models/shop-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ShopReportsTabsValues } from '@typings/enums/shop-report'

import { observerConfig } from './client-shops-report-view.config'
import { getClassParams } from './helpers/get-class-params'

export class ClientShopsViewModel extends DataGridFilterTableModel {
  tabValue = ShopReportsTabsValues.PPC_ORGANIC_BY_DAY

  inventoryProducts: any = []

  showBindStockGoodsToInventoryModal = false
  showConfirmModal = false
  showSelectShopsModal = false
  shopsData: any = []

  constructor(currentTabsValues: ShopReportsTabsValues, history: any) {
    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL, fieldsForSearch, tableKey } =
      getClassParams(currentTabsValues)

    super({
      getMainDataMethod,
      columnsModel: columnsModel(),
      filtersFields,
      mainMethodURL,
      fieldsForSearch,
      tableKey,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    this.history = history

    this.tabValue = currentTabsValues

    this.getDataGridState()
    this.initUserSettings()

    makeObservable(this, observerConfig)
  }

  onChangeTab(value: ShopReportsTabsValues) {
    this.tabValue = value

    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL, fieldsForSearch, tableKey } =
      getClassParams(value)

    const columns = columnsModel()

    this.getMainDataMethod = getMainDataMethod
    this.columnsModel = columns
    this.defaultColumnsModel = columns
    this.filtersFields = filtersFields
    this.setColumnMenuSettings(filtersFields)
    this.mainMethodURL = mainMethodURL
    this.tableKey = tableKey

    this.defaultSortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.paginationModel = paginationModelInitialValue

    this.filterModel = filterModelInitialValue
    this.fieldsForSearch = fieldsForSearch

    this.getTableSettingsPreset()
  }

  initUserSettings() {
    const url = new URL(window.location.href)
    const currentReport = url.searchParams.get('currentReport') as ShopReportsTabsValues
    const currentShopId = url.searchParams.get('shopId')

    if (!currentReport || !currentShopId) {
      this.getTableSettingsPreset()
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
      this.tabValue = currentReport
      this.history.push(this.history.location.pathname)
    }

    this.getTableSettingsPreset()
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

      toast.success(t(TranslationKey.Created))
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  deleteReportHandler() {
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

    this.onTriggerOpenModal('showConfirmModal')
  }

  async submitDeleteReportHandler() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await SellerBoardModel.deleteIntegrationsReport(this.tabValue, this.selectedRows)

      await this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async bindStockGoodsToInventoryHandler() {
    if (this.tabValue === ShopReportsTabsValues.INVENTORY) {
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
        this.inventoryProducts = result.rows
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

      toast.success(t(TranslationKey['The product is bound']))
    } catch (error) {
      toast.error(t(TranslationKey["You can't bind"]))

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
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }
}
