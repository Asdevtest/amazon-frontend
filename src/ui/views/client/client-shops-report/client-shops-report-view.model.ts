/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model/data-grid-filter-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { getClassParams } from './helpers/get-class-params'
import { TabsValues } from './helpers/tabs-value'

export class ClientShopsViewModel extends DataGridFilterTableModel {
  _tabKey = TabsValues.STOCK_REPORT
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

  constructor(currentTabsValues: TabsValues) {
    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL } = getClassParams(currentTabsValues)

    super(getMainDataMethod, columnsModel(), filtersFields, mainMethodURL)

    makeObservable(this, {
      _tabKey: observable,
      _inventoryProducts: observable,
      _showBindStockGoodsToInventoryModal: observable,
      _showWarningInfoModal: observable,

      tabKey: computed,
      inventoryProducts: computed,
      showBindStockGoodsToInventoryModal: computed,
      showWarningInfoModal: computed,

      changeTabHandler: action.bound,
      moveGoodsToInventoryHandler: action.bound,
      deleteReportHandler: action.bound,
      bindStockGoodsToInventoryHandler: action.bound,

      getProductsMy: action.bound,
      submitBindStockGoodsHandler: action.bound,
    })
  }

  changeTabHandler = (key: TabsValues) => {
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
      this.requestStatus = loadingStatuses.IS_LOADING

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

      this.requestStatus = loadingStatuses.SUCCESS

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
      this.requestStatus = loadingStatuses.FAILED
      console.log(error)
    }
  }

  async deleteReportHandler() {
    try {
      this.requestStatus = loadingStatuses.IS_LOADING

      await SellerBoardModel.deleteIntegrationsReport(this.tabKey, this.selectedRows)

      await this.getMainTableData()

      this.requestStatus = loadingStatuses.SUCCESS
    } catch (error) {
      this.requestStatus = loadingStatuses.FAILED
      console.log(error)
    }
  }

  async bindStockGoodsToInventoryHandler() {
    this.onTriggerOpenModal('showBindStockGoodsToInventoryModal')
  }

  async getProductsMy(filters?: any, isRecCall?: boolean) {
    try {
      this.requestStatus = loadingStatuses.IS_LOADING

      const result = await ClientModel.getProductPermissionsData({ filters })

      runInAction(() => {
        this.inventoryProducts = addIdDataConverter(result.rows)
      })

      if (!this.inventoryProducts.length && isRecCall) {
        this.getProductsMy()
      }
      this.requestStatus = loadingStatuses.SUCCESS
    } catch (error) {
      console.log(error)
      if (isRecCall) {
        this.requestStatus = loadingStatuses.IS_LOADING

        this.getProductsMy()

        this.requestStatus = loadingStatuses.SUCCESS
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
