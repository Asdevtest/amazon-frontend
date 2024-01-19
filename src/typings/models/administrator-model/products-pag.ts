import { IProduct } from '@typings/product'

export interface IProductsPag {
  count?: number
  rows?: IProduct[]
}
