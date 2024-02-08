import { IRedFlag } from '@typings/product'

import { ISupplier } from '../shared/supplier'
import { ITag } from '../shared/tag'

import { ICreatedBy } from './../shared/created-by'

export interface IClientProductsMy {
  _id?: string
  asin?: string
  skuByClient?: string
  suppliers?: Array<ISupplier>
  currentSupplier?: ISupplier
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
  images?: Array<string>
  latestSeoFiles?: Array<string>
  priceForClient?: number
  checkednotes?: string
  isCreatedByClient?: boolean
  client?: ICreatedBy
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
  createdBy?: ICreatedBy
  checkedBy?: ICreatedBy
  createdAt?: string
  updatedAt?: string
  checkedAt?: string
  buyer?: ICreatedBy
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
  boxAmounts?: Array<IProductByStatusBoxAmount>
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
  subUsers?: Array<ICreatedBy>
  redFlags?: Array<IRedFlag>
  tags?: Array<ITag>
  checkedby?: IProductVacCheckedBy
  productsInWarehouse?: Array<object>
  ideasCounter?: number
}

export interface IProductVacCheckedBy {
  _id: string
  name: string
  role: number
  fba: boolean
  active: boolean
  rate: number
  balance?: number
  balanceFreeze?: number
  overdraft?: number
  permissions?: Array<string>
  permissionGroups?: Array<string>
  masterUser?: string
  allowedRoles?: Array<number>
}

export interface IProductByStatusBoxAmount {
  _id?: string
  storekeeper?: ICreatedBy
  amountInBoxes?: number
}
