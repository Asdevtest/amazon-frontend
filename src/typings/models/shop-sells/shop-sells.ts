import { ICreatedBy } from '../../shared/created-by'

import { IShopSellStatistics } from './shop-sells-statistics'

export interface IShopSells {
  _id: string
  owner: ICreatedBy
  title: string
  status: string
  files: Array<string>
  price: number
  monthlyMultiplier: number
  statistics: IShopSellStatistics
  businessStartDate: string
  shopDetails: string
}
