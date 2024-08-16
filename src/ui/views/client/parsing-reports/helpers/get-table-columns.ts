import { accountHealthColumns } from '../parsing-reports-columns/account-health.columns'
import { brandsReviewColumns } from '../parsing-reports-columns/brands-review.columns'
import { businessReportsColumns } from '../parsing-reports-columns/business-reports.columns'
import { campaignsColumns } from '../parsing-reports-columns/campaigns.columns'
import { fbaInventoryColumns } from '../parsing-reports-columns/fba-inventory.columns'
import { feedbackColumns } from '../parsing-reports-columns/feedback.columns'
import { inventoryPlanningColumns } from '../parsing-reports-columns/inventory-planning.columns'
import { inventoryShipmentsColumns } from '../parsing-reports-columns/inventory-shipments.columns'
import { inventoryColumns } from '../parsing-reports-columns/inventory.columns'
import { ordersColumns } from '../parsing-reports-columns/orders.columns'
import { perfomanceNotificationsColumns } from '../parsing-reports-columns/perfomance-notifications.columns'
import { returnsColumns } from '../parsing-reports-columns/returns.columns'
import { totalBalanceColumns } from '../parsing-reports-columns/total-balance.columns'
import { transactionsColumns } from '../parsing-reports-columns/transactions.columns'
import { voiceColumns } from '../parsing-reports-columns/voice.columns'
import { ParsingReportsType } from '../parsing-reports.type'

export const getTableColumns = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.BUSINESS_REPORTS:
      return businessReportsColumns()

    case ParsingReportsType.ORDERS:
      return ordersColumns()

    case ParsingReportsType.TOTAL_BALANCE:
      return totalBalanceColumns()

    case ParsingReportsType.FEEDBACK:
      return feedbackColumns()

    case ParsingReportsType.TRANSACTIONS:
      return transactionsColumns()

    case ParsingReportsType.INVENTORY:
      return inventoryColumns()

    case ParsingReportsType.CAMPAIGNS:
      return campaignsColumns()

    case ParsingReportsType.PERFOMANCE_NOTIFICATIONS:
      return perfomanceNotificationsColumns()

    case ParsingReportsType.FBA_INVENTORY:
      return fbaInventoryColumns()

    case ParsingReportsType.ACCOUNT_HEALTH:
      return accountHealthColumns()

    case ParsingReportsType.RETURNS:
      return returnsColumns()

    case ParsingReportsType.INVENTORY_PLANNING:
      return inventoryPlanningColumns()

    case ParsingReportsType.BRANDS_REVIEW:
      return brandsReviewColumns()

    case ParsingReportsType.INVENTORY_SHIPMENTS:
      return inventoryShipmentsColumns()

    case ParsingReportsType.VOICE:
      return voiceColumns()

    default:
      return businessReportsColumns()
  }
}
