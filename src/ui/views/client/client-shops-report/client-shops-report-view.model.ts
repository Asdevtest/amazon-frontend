/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model/data-grid-filter-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { getPropertiesToObject } from '@utils/object'
import { t } from '@utils/translations'

import { IListOfModals } from '@typings/data-grid'

import { getClassParams } from './helpers/get-class-params'
import { tabsValues } from './helpers/tabs-value'

export class ClientShopsViewModel extends DataGridFilterTableModel {
  _tabKey = tabsValues.STOCK_REPORT
  get tabKey() {
    return this._tabKey
  }

  _inventoryProducts: any = []
  get inventoryProducts() {
    return this._inventoryProducts
  }
  set inventoryProducts(inventoryProducts) {
    this._inventoryProducts = inventoryProducts
  }

  constructor(currentTabsValues: tabsValues) {
    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL } = getClassParams(currentTabsValues)

    super(
      getMainDataMethod,
      columnsModel(),
      filtersFields,
      mainMethodURL,
      undefined,
      undefined,
      getPropertiesToObject(['showBindStockGoodsToInventoryModal', 'showWarningInfoModal']) as IListOfModals,
    )

    makeObservable(this, {
      _tabKey: observable,
      _inventoryProducts: observable,

      tabKey: computed,
      inventoryProducts: computed,

      changeTabHandler: action.bound,
      moveGoodsToInventoryHandler: action.bound,
      deleteReportHandler: action.bound,
      bindStockGoodsToInventoryHandler: action.bound,

      getProductsMy: action.bound,
      submitBindStockGoodsHandler: action.bound,
    })
  }

  changeTabHandler = (key: tabsValues) => {
    this._tabKey = key

    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL } = getClassParams(key)

    this.getMainDataMethod = getMainDataMethod
    this.columnsModel = columnsModel()
    this.filtersFields = filtersFields
    this.setColumnMenuSettings(filtersFields)
    this.mainMethodURL = mainMethodURL

    this.getMainTableData()
  }

  async moveGoodsToInventoryHandler() {
    try {
      this.requestStatus = loadingStatuses.isLoading

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

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async deleteReportHandler() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      await SellerBoardModel.deleteIntegrationsReport(this.tabKey, this.selectedRows)

      await this.getMainTableData()

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  async bindStockGoodsToInventoryHandler() {
    this.onTriggerOpenModal('showBindStockGoodsToInventoryModal')
  }

  async getProductsMy(filters?: any, isRecCall?: boolean) {
    try {
      this.requestStatus = loadingStatuses.isLoading

      const result = await ClientModel.getProductPermissionsData({ filters })

      runInAction(() => {
        this.inventoryProducts = addIdDataConverter(result.rows)
      })

      if (!this.inventoryProducts.length && isRecCall) {
        this.getProductsMy()
      }
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log(error)
      if (isRecCall) {
        this.requestStatus = loadingStatuses.isLoading

        this.getProductsMy()

        this.requestStatus = loadingStatuses.success
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
}
