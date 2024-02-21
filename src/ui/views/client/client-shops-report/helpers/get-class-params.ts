/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ShopReportsTabsValues } from '@constants/tabs/shop-report'

import { SellerBoardModel } from '@models/seller-board-model'

import { clientDailySellerBoardColumns } from '@components/table/table-columns/client/client-daily-seller-board-columns'
import { clientIntegrationsReportInventoryShipmentsColumns } from '@components/table/table-columns/client/client-integrations-report-inventory-shipments-columns'
import { clientIntegrationsReportReturnsColumns } from '@components/table/table-columns/client/client-integrations-report-returns-columns'
import { clientInventoryReportColumns } from '@components/table/table-columns/client/client-inventory-report'
import { clientLast30DaySellerBoardColumns } from '@components/table/table-columns/client/client-last-30-day-seller-board-columns copy'
import { clientPPCSalesWeekColumns } from '@components/table/table-columns/client/client-ppc-sales-week-columns'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

export const getClassParams = (currentShopReport: ShopReportsTabsValues): any => {
  const fieldsForSearch = ['asin', 'sku']

  switch (currentShopReport) {
    case ShopReportsTabsValues.STOCK_REPORT:
      return {
        getMainDataMethod: SellerBoardModel.getStockGoods,
        columnsModel: clientDailySellerBoardColumns,
        filtersFields: getFilterFields(clientDailySellerBoardColumns(), ['sku']),
        mainMethodURL: 'integrations/sellerboard_warehouse_stocks?',
        tableKey: DataGridTablesKeys.SHOPS_REPORT_STOCK_REPORT,
        fieldsForSearch,
      }
    case ShopReportsTabsValues.GOODS_DAYS_REPORT:
      return {
        getMainDataMethod: SellerBoardModel.getMyDailyReportsLast30Days,
        columnsModel: clientLast30DaySellerBoardColumns,
        filtersFields: getFilterFields(clientLast30DaySellerBoardColumns(), ['sku']),
        mainMethodURL: 'integrations/sellerboard_dashboard_products_days_reports_last_30_days?',
        tableKey: DataGridTablesKeys.SHOPS_REPORT_GOODS_DAYS_REPORT,
        fieldsForSearch,
      }
    case ShopReportsTabsValues.INVENTORY:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportInventory,
        columnsModel: clientInventoryReportColumns,
        filtersFields: getFilterFields(clientInventoryReportColumns(), ['sku']),
        mainMethodURL: 'integrations/report_inventory?',
        tableKey: DataGridTablesKeys.SHOPS_REPORT_INVENTORY,
        fieldsForSearch,
      }
    case ShopReportsTabsValues.PPC:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportPpcSalesWeeks,
        columnsModel: clientPPCSalesWeekColumns,
        filtersFields: getFilterFields(clientPPCSalesWeekColumns(), ['sku']),
        mainMethodURL: 'integrations/report_ppc_sales_weeks?',
        tableKey: DataGridTablesKeys.SHOPS_REPORT_PPC,
        fieldsForSearch,
      }
    case ShopReportsTabsValues.INVENTORY_SHIPMENTS:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportInventoryShipments,
        columnsModel: clientIntegrationsReportInventoryShipmentsColumns,
        filtersFields: getFilterFields(clientIntegrationsReportInventoryShipmentsColumns()),
        mainMethodURL: 'integrations/report_inventory_shipments?',
        tableKey: DataGridTablesKeys.SHOPS_REPORT_INVENTORY_SHIPMENTS,
        fieldsForSearch: ['sku'],
      }
    case ShopReportsTabsValues.RETURNS:
      return {
        getMainDataMethod: SellerBoardModel.getIntegrationsReportReturns,
        columnsModel: clientIntegrationsReportReturnsColumns,
        filtersFields: getFilterFields(clientIntegrationsReportReturnsColumns(), ['sku']),
        mainMethodURL: 'integrations/report_returns?',
        tableKey: DataGridTablesKeys.SHOPS_REPORT_RETURNS,
        fieldsForSearch: ['sku'],
      }
  }
}
