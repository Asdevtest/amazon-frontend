import { IIntegrationReportInventory } from './integrations-report-inventory'

export interface IIntegrationReportInventories {
  count: number
  rows: Array<IIntegrationReportInventory>
}
