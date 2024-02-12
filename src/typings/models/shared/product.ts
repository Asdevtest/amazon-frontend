import { ICreatedBy } from './created-by'
import { IFullUser } from './full-user'
import { IOrder } from './order'
import { IRedFlag } from './red-flag'
import { ISupplier } from './supplier'
import { ITag } from './tag'

export interface IProduct {
  _id?: string
  asin?: string
  skuByClient?: string
  suppliers?: ISupplier[]
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
  images?: string[]
  latestSeoFiles?: string[]
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
  boxAmounts?: IBoxAmount
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
  subUsers?: ICreatedBy
  redFlags?: IRedFlag[]
  tags?: ITag[]
  checkedby?: IFullUser
  productsInWarehouse?: object[]
  ideasCounter?: number
  sumStock?: number
  purchaseQuantity?: number
  stockCost?: number
  productsInWarehouseSchema?: Array<object>
  orders?: Array<IOrder>
}

export interface IBoxAmount {
  _id?: string
  storekeeper?: ICreatedBy
  amountInBoxes?: number
}
