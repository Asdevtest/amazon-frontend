import { IStockGood } from './stock-good'

export interface IStockGoods {
  count: number
  rows: Array<IStockGood>
}
