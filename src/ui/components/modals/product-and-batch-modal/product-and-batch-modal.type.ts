import { IOrder } from '@typings/models/orders/order'
import { IProduct } from '@typings/models/products/product'

export enum ProductAndBatchModalSwitcherConditions {
  ORDER_INFORMATION = 'ORDER_INFORMATION',
  BATCH_DATA = 'BATCH_DATA',
}

export interface IProductWithOrder extends IProduct {
  orders: IOrder[]
  sumStock: number
  purchaseQuantity: number
  stockCost: number
}

export interface IModalConfig {
  title: string
  element: () => JSX.Element
  onClick?: () => void
}
