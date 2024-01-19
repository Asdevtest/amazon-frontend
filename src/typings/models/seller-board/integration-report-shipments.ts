import { IShop } from '@typings/shop'

interface IIntegrationReportShipments {
  count?: number

  rows?: Array<IIntegrationInventoryShipments>
}

export interface IIntegrationInventoryShipments {
  _id?: string
  shop?: IShop
  shopId?: string
  dateDataUpdate?: string
  timeDataUpdate?: string
  sku?: string
  shipmentId?: string
  referenceId?: string
  dateCreated?: string
  dateUpdated?: string
  shipTo?: string
  unitsExpected?: number
  status?: string
  scheduledCarrierDeliveryDate?: string
  deliveryWindowStart?: string
  deliveryWindowEnd?: string
  createdAt?: string
  updatedAt?: string
}
