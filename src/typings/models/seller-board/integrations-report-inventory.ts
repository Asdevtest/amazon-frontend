import { IShop } from '@typings/shop'

export interface IIntegrationReportInventory {
  count?: number

  rows?: Array<IIntegrationReportItem>
}
export interface IIntegrationReportItem {
  _id?: string
  productId?: string
  shopId?: string
  asin?: string
  sku?: string
  price?: number
  fbaFee?: number
  refFee?: number
  available?: number
  inbound?: number
  reserved?: number
  dateUpdated?: string
  timeUpdated?: string
  createdAt?: string
  updatedAt?: string
  shop?: IShop
}
