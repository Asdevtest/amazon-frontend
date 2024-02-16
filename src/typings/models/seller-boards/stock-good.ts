import { IShop } from '../shops/shop'

export interface IStockGood {
  asin: string
  sku: string
  title: string
  roi: number
  fbaFbmStock: number
  stockValue: number
  estimatedSalesVelocity: number
  daysOfStockLeft: number
  recommendedQuantityForReordering: number
  runningOutOfStock: string
  reserved: number
  sentToFba: number
  fbaPrepStock: number
  ordered: string
  timeToReorder: string
  comment: string
  marketplace: string
  targetStockRangeAfterNewOrderDays: number
  fbaBufferDays: number
  manufTimeDays: number
  useAPrepCenter: string
  shippingToPrepCenterDays: number
  shippingToFbaDays: number
  _id: string
  createdAt: string
  updatedAt: string
  shop: IShop
}
