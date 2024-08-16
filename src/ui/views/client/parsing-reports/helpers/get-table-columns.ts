import { accountHealthColumns } from '../parsing-reports-columns/account-health.columns'
import { businessReportsColumns } from '../parsing-reports-columns/business-reports.columns'
import { feedbackColumns } from '../parsing-reports-columns/feedback.columns'
import { inventoryColumns } from '../parsing-reports-columns/inventory.columns'
import { ordersColumns } from '../parsing-reports-columns/orders.columns'
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

    case ParsingReportsType.ACCOUNT_HEALTH:
      return accountHealthColumns()

    case ParsingReportsType.VOICE:
      return voiceColumns()

    default:
      return businessReportsColumns()
  }
}
