export interface IProductsChecking {
  _id?: string
  asin?: string
  skuByClient?: string
  suppliers?: Supplier[]
  currentSupplier?: Supplier
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
  client?: {
    // Add properties from ApiV1AdminsGetProductsByStatusCreatedBy
  }
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
  createdBy?: {
    // Add properties from ApiV1AdminsGetProductsByStatusCreatedBy
  }
  checkedBy?: {
    // Add properties from ApiV1AdminsGetProductsByStatusCreatedBy
  }
  createdAt?: string
  updatedAt?: string
  checkedAt?: string
  buyer?: {
    // Add properties from ApiV1AdminsGetProductsByStatusCreatedBy
  }
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
  boxAmounts?: {
    // Add properties from ApiV1AdminsGetProductsByStatusBoxAmounts
  }[]
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
  subUsers?: {
    // Add properties from ApiV1AdminsGetProductsByStatusCreatedBy
  }[]
  redFlags?: {
    // Add properties from ApiV1AdminsGetProductsByStatusRedFlags
  }[]
  tags?: {
    // Add properties from ApiV1AdminsGetProductsByStatusTags
  }[]
}

export interface Supplier {
  _id?: string
  name?: string
  // Add other properties as needed
}
