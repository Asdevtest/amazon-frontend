import { accountHealthColumns } from '../parsing-reports-columns/account-health.columns'
import { businessReportsColumns } from '../parsing-reports-columns/business-reports.columns'
import { totalBalanceColumns } from '../parsing-reports-columns/total-balance.columns'
import { voiceColumns } from '../parsing-reports-columns/voice.columns'
import { ParsingReportsType } from '../parsing-reports.type'

export const getTableColumns = (activeTable: ParsingReportsType) => {
  switch (activeTable) {
    case ParsingReportsType.BUSINESS_REPORTS:
      return businessReportsColumns()

    case ParsingReportsType.TOTAL_BALANCE:
      return totalBalanceColumns()

    case ParsingReportsType.ACCOUNT_HEALTH:
      return accountHealthColumns()

    case ParsingReportsType.VOICE:
      return voiceColumns()

    default:
      return businessReportsColumns()
  }
}
