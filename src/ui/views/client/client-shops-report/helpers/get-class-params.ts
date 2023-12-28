/* eslint-disable @typescript-eslint/no-explicit-any */
import { SellerBoardModel } from '@models/seller-board-model'

import { clientDailySellerBoardColumns } from '@components/table/table-columns/client/client-daily-seller-board-columns'
import { clientIntegrationsReportInventoryShipmentsColumns } from '@components/table/table-columns/client/client-integrations-report-inventory-shipments-columns'
import { clientInventoryReportColumns } from '@components/table/table-columns/client/client-inventory-report'
import { clientLast30DaySellerBoardColumns } from '@components/table/table-columns/client/client-last-30-day-seller-board-columns copy'
import { clientPPCSalesWeekColumns } from '@components/table/table-columns/client/client-ppc-sales-week-columns'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { TabsValues } from './tabs-value'

export const getClassParams = (currentShopReport: TabsValues): any => {
  switch (currentShopReport) {
    case TabsValues.STOCK_REPORT:
      return {
        getMainDataMethod: SellerBoardModel.getStockGoods,
        columnsModel: clientDailySellerBoardColumns,
        filtersFields: getFilterFields(clientDailySellerBoardColumns(), ['sku']),
        mainMethodURL: 'integrations/sellerboard_warehouse_stocks',
      }
    case TabsValues.GOODS_DAYS_REPORT:
      return {
        getMainDataMethod: SellerBoardModel.getMyDailyReportsLast30Days,
        columnsModel: clientLast30DaySellerBoardColumns,
        filtersFields: getFilterFields(clientLast30DaySellerBoardColumns(), ['sku']),
        mainMethodURL: 'integrations/sellerboard_dashboard_products_days_reports_last_30_days',
      }
    case TabsValues.INVENTORY:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportInventory,
        columnsModel: clientInventoryReportColumns,
        filtersFields: getFilterFields(clientInventoryReportColumns(), ['sku']),
        mainMethodURL: 'integrations/report_inventory',
      }
    case TabsValues.PPC:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportPpcSalesWeeks,
        columnsModel: clientPPCSalesWeekColumns,
        filtersFields: getFilterFields(clientPPCSalesWeekColumns(), ['sku']),
        mainMethodURL: 'integrations/report_ppc_sales_weeks',
      }
    case TabsValues.INVENTORY_SHIPMENTS:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportInventoryShipments,
        columnsModel: clientIntegrationsReportInventoryShipmentsColumns,
        filtersFields: getFilterFields(clientIntegrationsReportInventoryShipmentsColumns()),
        mainMethodURL: 'integrations/report_inventory_shipments',
      }
  }
}
