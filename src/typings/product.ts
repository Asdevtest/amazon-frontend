import { PaymentMethod } from './payments'
import { IUploadFile } from './upload-file'

export interface IProduct {
  amazon: number
  amazonDescription: string
  amazonDetail: string
  amazonTitle: string
  amountInOrders: number
  amountInPendingOrders: number
  archive: boolean
  asin: string
  asins: string
  avgBSR: string
  avgPrice: string
  avgRevenue: string
  avgReviews: string
  barCode: string
  boxAmounts: IBoxAmount[]
  bsr: number
  buyer: IMember
  buyerRate: number
  buyerTimeoutAt: string
  buyersComment: string
  category: string
  checkedAt: string
  checkedBy: IMember
  checkednotes: string
  chinaTitle: string
  client: IMember
  clientComment: string
  coefficient: string
  createdAt: string
  createdBy: IMember
  currentSupplier: ISupplier
  currentSupplierId: string
  fba: boolean
  fbaFbmStockSum: number
  fbaamount: number
  fbafee: number
  fourMonthesStock: number
  height: number
  hsCode: string
  icomment: string
  ideasClosed: number
  ideasOnCheck: number
  ideasVerified: number
  images: Array<string | IUploadFile>
  inTransfer: number
  isCreatedByClient: boolean
  lamazon: string
  length: number
  margin: number
  material: string
  minpurchase: number
  needCheckBySupervisor: boolean
  niche: string
  paidAt: string
  priceForClient: number
  productUsage: string
  profit: number
  redFlags: IRedFlag[]
  reffee: number
  researcherRate: number
  reservedSum: number
  sentToFbaSum: number
  shopId: string
  skuByClient: string
  status: number
  stockUSA: number
  strategyStatus: number
  supervisorRate: number
  suppliers: ISupplier[]
  tags: ITag[]
  totalRevenue: string
  updatedAt: string
  weight: number
  width: number
  _id: string
  parentProductId: string
  hasChildren: boolean
}

export interface IBoxAmount {
  amountInBoxes: number
  storekeeper: IStorekeeper
  _id: string
}

export interface IStorekeeper {
  name: string
  _id: string
}

export interface ISupplier {
  amount: number
  batchDeliveryCostInDollar: number
  batchDeliveryCostInYuan: number
  batchTotalCostInDollar: number
  batchTotalCostInYuan: number
  boxProperties: IBoxProperties
  comment: string
  createdAt: string
  createdBy: IMember
  images: string[]
  link: string
  minlot: number
  multiplicity: boolean
  name: string
  paymentMethods: PaymentMethod[]
  price: number
  priceInYuan: number
  priceVariations: IPriceVariation[]
  productionTerm: number
  updatedAt: string
  yuanRate: number
  _id: string
}

export interface IBoxProperties {
  amountInBox: number
  boxHeightCm: number
  boxLengthCm: number
  boxWeighGrossKg: number
  boxWidthCm: number
}

export interface IMember {
  name: string
  rating: number
  _id: string
}

export interface IRedFlag {
  title: string
  _id: string
  value: number
  productCount: number
  iconImage?: string
}

export interface IPriceVariation {
  price: number
  quantity: number
}

export interface ITag {
  title: string
  _id: string
}

export interface IProductVariation {
  amazonTitle: string
  asin: string
  images: Array<string>
  shopId: string
  skuByClient: string
  _id: string
}

export interface IProductIdeaNotification {
  _id: string
  asin: string
  images: Array<string>
  buyerId: string
  clientId: string
  skuByClient: string
}

export enum ProductVariation {
  PARENT = 'PARENT',
  CHILD = 'CHILD',
}
