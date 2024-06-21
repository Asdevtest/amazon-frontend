import { IOrder } from '../orders/order'
import { IProduct } from '../products/product'

export interface IBoxItem {
  _id: string
  amount: number
  barCode: string
  isBarCodeAttachedByTheStorekeeper: boolean
  isBarCodeAlreadyAttachedByTheSupplier: boolean
  transparencyFile: string
  isTransparencyFileAttachedByTheStorekeeper: boolean
  isTransparencyFileAlreadyAttachedByTheSupplier: boolean
  product: IProduct
  order: IOrder
}
