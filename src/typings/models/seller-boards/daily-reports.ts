import { IDailyReport } from './daily-report'

export interface IDailyReports {
  count: number
  rows: Array<IDailyReport>
}
