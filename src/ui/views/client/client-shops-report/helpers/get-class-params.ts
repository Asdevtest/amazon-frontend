/* eslint-disable @typescript-eslint/no-explicit-any */
import { SellerBoardModel } from '@models/seller-board-model'

import { clientDailySellerBoardColumns } from '@components/table/table-columns/client/client-daily-seller-board-columns'
import { clientLast30DaySellerBoardColumns } from '@components/table/table-columns/client/client-last-30-day-seller-board-columns copy'

import { tabsValues } from './tabs-value'

export const getClassParams = (currentShopReport: tabsValues): any => {
  switch (currentShopReport) {
    case tabsValues.STOCK_REPORT:
      return {
        getMainDataMethod: SellerBoardModel.getStockGoods,
        columnsModel: clientDailySellerBoardColumns(),
      }
    case tabsValues.GOODS_DAYS_REPORT:
      return {
        getMainDataMethod: SellerBoardModel.getMyDailyReportsLast30Days,
        columnsModel: clientLast30DaySellerBoardColumns(),
      }
  }
}
