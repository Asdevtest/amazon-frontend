import { IStatusCreatedBy } from '../shared/created-by'
import { IStatusTags } from '../shared/status-tags'

import { IProductByStatusSupplier } from './admin-orders'

export interface IProductsChecking {
  _id?: string
  asin?: string
  skuByClient?: string
  suppliers?: IProductByStatusSupplier[]
  currentSupplier?: IProductByStatusSupplier
  currentSupplierId?: string
  parentProductId?: string
  hasChildren?: boolean
  category?: string
  lamazon?: string
  bsr?: number
  fba?: boolean
  amazon?: number
  height?: number
  width?: number
  length?: number
  weight?: number
  reffee?: number
  fbafee?: number
  fbaamount?: number
  status?: number
  icomment?: string
  clientComment?: string
  images?: string[]
  latestSeoFiles?: string[]
  priceForClient?: number
  checkednotes?: string
  isCreatedByClient?: boolean
  client?: IStatusCreatedBy
  amazonDescription?: string
  amazonDetail?: string
  amazonTitle?: string
  material?: string
  productUsage?: string
  chinaTitle?: string
  barCode?: string
  transparency?: boolean
  minpurchase?: number
  profit?: number
  margin?: number
  inTransfer?: number
  createdBy?: IStatusCreatedBy
  checkedBy?: IStatusCreatedBy
  createdAt?: string
  updatedAt?: string
  checkedAt?: string
  buyer?: IStatusCreatedBy
  buyerTimeoutAt?: string
  buyersComment?: string
  shopId?: string
  researcherRate?: number
  supervisorRate?: number
  paidAt?: string
  buyerRate?: number
  strategyStatus?: number
  needCheckBySupervisor?: boolean
  amountInOrders?: number
  amountInPendingOrders?: number
  boxAmounts?: IProductByStatusBoxAmount
  archive?: boolean
  hsCode?: string
  niche?: string
  asins?: string
  totalRevenue?: string
  coefficient?: string
  avgRevenue?: string
  avgBSR?: string
  avgPrice?: string
  avgReviews?: string
  fourMonthesStock?: number
  stockUSA?: number
  reservedSum?: number
  sentToFbaSum?: number
  fbaFbmStockSum?: number
  ideasOnCheck?: number
  ideasFinished?: number
  ideasClosed?: number
  subUsers?: IStatusCreatedBy
  redFlags?: IProductdsRedFlag[]
  tags?: IStatusTags[]
}

export interface IProductdsRedFlag {
  _id?: string

  productCount?: number

  value?: number

  title?: string

  iconImage?: string
}

export interface IProductByStatusBoxAmount {
  _id?: string

  storekeeper?: IStatusCreatedBy

  amountInBoxes?: number
}
