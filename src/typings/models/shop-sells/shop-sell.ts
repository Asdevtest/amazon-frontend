import { ICreatedBy } from '../../shared/created-by'

import { IShopSellStatistics } from './shop-sells-statistics'

export interface IShopSell {
  _id: string
  owner: ICreatedBy
  bidderId: string
  moderatorId: string
  chatId: string
  title: string
  status: string
  files: Array<string>
  price: number
  monthlyProfit: number
  monthlyPureProfit: number
  monthlyMultiplier: number
  statistics: Array<IShopSellStatistics>
  businessStartDate: string
  shopDetails: string
  shopLink: string
  shopAssets: Array<string>
  opportunities: Array<string>
  risks: Array<string>
  requiredSkills: Array<string>
  sellIncludes: Array<string>
  reasonForSale: Array<string>
  additionalInfo: Array<string>
  createdAt: string
  updatedAt: string
}
