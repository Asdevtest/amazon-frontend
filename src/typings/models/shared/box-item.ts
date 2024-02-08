import { IOrder } from './order'
import { IProduct } from './product'

export interface IBoxItem {
  _id?: string
  amount?: number
  barCode?: string
  isBarCodeAttachedByTheStorekeeper?: boolean
  isBarCodeAlreadyAttachedByTheSupplier?: boolean
  transparencyFile?: string
  isTransparencyFileAttachedByTheStorekeeper?: boolean
  isTransparencyFileAlreadyAttachedByTheSupplier?: boolean
  product?: IProduct
  order?: IOrder
}
