/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, makeObservable, observable } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model/data-grid-filter-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { getClassParams } from './helpers/get-class-params'
import { tabsValues } from './helpers/tabs-value'

export class ClientShopsViewModel extends DataGridFilterTableModel {
  _tabKey = tabsValues.STOCK_REPORT

  get tabKey() {
    return this._tabKey
  }

  constructor(currentTabsValues: tabsValues) {
    const { getMainDataMethod, columnsModel, filtersFields, mainMethodURL } = getClassParams(currentTabsValues)

    super(getMainDataMethod, columnsModel(), filtersFields, mainMethodURL)

    makeObservable(this, {
      _tabKey: observable,

      tabKey: computed,

      changeTabHandler: action,
      moveGoodsToInventoryHandler: action,
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

  async bindStockGoodsToInventoryHandler() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      const requestBody = []

      for (const row of this.selectedRows) {
        const selectedRow = this.tableData?.find(item => item._id === row)

        if (selectedRow) {
          requestBody.push({
            productId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            warehouseStocks: [
              {
                shopId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                sku: 'string',
              },
            ],
          })
        }
      }

      console.log(requestBody)

      // await SellerBoardModel.bindStockProductsBySku(requestBody)

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }
}
