/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, makeObservable, observable } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model/data-grid-filter-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { getPropertiesToObject } from '@utils/object'

import { IListOfModals } from '@typings/data-grid'

import { getClassParams } from './helpers/get-class-params'
import { tabsValues } from './helpers/tabs-value'

export class ClientShopsViewModel extends DataGridFilterTableModel {
  _tabKey = tabsValues.STOCK_REPORT

  get tabKey() {
    return this._tabKey
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
      getPropertiesToObject(['showBindStockGoodsToInventoryModal']) as IListOfModals,
    )

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
}
