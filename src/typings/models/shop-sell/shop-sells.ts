import { ICreatedBy } from '../shared/created-by'

export interface IShopSells {
  _id?: string
  owner?: ICreatedBy
  title?: string
  status?: string
  files?: Array<string>
  price?: number
  monthlyMultiplier?: number
  statistics?: IShopSellStatistics
  businessStartDate?: string
  shopDetails?: string
}

export interface IShopSellStatistics {
  monthlyProfit?: number

  monthlyPureProfit?: number

  monthlyProfitDiffPercentage?: number

  monthlyPureProfitDiffPercentage?: number

  webpageVisitsDiffPercentage?: number
}
