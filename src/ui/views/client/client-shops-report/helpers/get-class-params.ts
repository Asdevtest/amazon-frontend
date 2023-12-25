/* eslint-disable @typescript-eslint/no-explicit-any */
import { SellerBoardModel } from '@models/seller-board-model'

import { clientDailySellerBoardColumns } from '@components/table/table-columns/client/client-daily-seller-board-columns'
import { clientIntegrationsReportInventoryShipmentsColumns } from '@components/table/table-columns/client/client-integrations-report-inventory-shipments-columns'
import { clientInventoryReportColumns } from '@components/table/table-columns/client/client-inventory-report'
import { clientLast30DaySellerBoardColumns } from '@components/table/table-columns/client/client-last-30-day-seller-board-columns copy'
import { clientPPCSalesWeekColumns } from '@components/table/table-columns/client/client-ppc-sales-week-columns'

import { tabsValues } from './tabs-value'

export const getClassParams = (currentShopReport: tabsValues): any => {
  switch (currentShopReport) {
    case tabsValues.STOCK_REPORT:
      return {
        getMainDataMethod: SellerBoardModel.getStockGoods,
        columnsModel: clientDailySellerBoardColumns,
        filtersFields: [
          'updatedAt',
          'shop',
          'asin',
          'sku',
          'title',
          'fbaFbmStock',
          'reserved',
          'roi',
          'comment',
          'daysOfStockLeft',
          'sentToFba',
          'fbaPrepStock',
          'ordered',
        ],
        mainMethodURL: 'integrations/sellerboard_warehouse_stocks',
      }
    case tabsValues.GOODS_DAYS_REPORT:
      return {
        getMainDataMethod: SellerBoardModel.getMyDailyReportsLast30Days,
        columnsModel: clientLast30DaySellerBoardColumns,
      }
    case tabsValues.INVENTORY:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportInventory,
        columnsModel: clientInventoryReportColumns,
      }
    case tabsValues.PPC:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportPpcSalesWeeks,
        columnsModel: clientPPCSalesWeekColumns,
      }
    case tabsValues.INVENTORY_SHIPMENTS:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportInventoryShipments,
        columnsModel: clientIntegrationsReportInventoryShipmentsColumns,
      }
  }
}
