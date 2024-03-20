import { IIntegrationReportShipment } from './integration-report-shipment'

export interface IIntegrationReportShipments {
  count: number
  rows: Array<IIntegrationReportShipment>
}
