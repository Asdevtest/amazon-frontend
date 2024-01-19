import { IOrder } from '../shared/order'

export interface IOrdersPag {
  count?: number
  rows?: IOrder[]
}
