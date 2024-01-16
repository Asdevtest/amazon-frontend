import { IOrderBox } from '@typings/order-box'
import { IProduct } from '@typings/product'

export enum ProductAndBatchModalSwitcherConditions {
  ORDER_INFORMATION = 'ORDER_INFORMATION',
  BATCH_DATA = 'BATCH_DATA',
}

export interface IProductWithOrder extends IProduct {
  orders: IOrderBox[]
  sumStock: number
  purchaseQuantity: number
  stockCost: number
}

export interface IModalConfig {
  title: string
  element: JSX.Element
}
