import { IStatusCreatedBy } from '../shared/created-by'

export interface IClientProductMy {
  _id?: string
  asin?: string
  skuByClient?: string
  shopId?: string
  images?: string[]
  amazonTitle?: string
  amountInOrders?: number
  updatedAt?: string
  fourMonthesStock?: number
  sumStock?: number
  purchaseQuantity?: number
  reservedSum?: number
  amountInPendingOrders?: number
  sentToFbaSum?: number
  fbaFbmStockSum?: number
  inTransfer?: number
  stockCost?: number
  productsInWarehouseSchema?: { [key: string]: any }[]
  boxAmounts?: IBoxAmounts[]
  orders?: IClientOrders[]
}

export interface IBoxAmounts {
  _id?: string
  storekeeper?: IStatusCreatedBy
  productId?: string
  amountInBoxes?: number
}

export interface IClientOrders {
  _id?: string
  id?: string
  status?: number
  amount?: number
  deadline?: string
}
