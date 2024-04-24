import { IShop } from '../shops/shop'

export interface IIntegrationReportShipment {
  _id: string
  shop: IShop
  shopId: string
  dateDataUpdate: string
  timeDataUpdate: string
  sku: string
  shipmentId: string
  referenceId: string
  dateCreated: string
  dateUpdated: string
  shipTo: string
  unitsExpected: number
  status: string
  scheduledCarrierDeliveryDate: string
  deliveryWindowStart: string
  deliveryWindowEnd: string
  createdAt: string
  updatedAt: string
}
