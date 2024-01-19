import { IStatusCreatedBy } from '../shared/created-by'

export interface ApiV1AdminsGetProductsByStatusSuppliers {
  _id?: string
  name?: string
  link?: string
  price?: number
  amount?: number
  minlot?: number
  images?: Array<string>
  comment?: string
  yuanRate?: number
  multiplicity?: boolean
  priceInYuan?: number
  batchDeliveryCostInDollar?: number
  batchDeliveryCostInYuan?: number
  batchTotalCostInDollar?: number
  batchTotalCostInYuan?: number
  boxProperties?: IStatusBoxProperties
  productionTerm?: number
  createdBy?: IStatusCreatedBy
  paymentMethods?: Array<IProductsStatusPaymentsMethod>
  priceVariations?: Array<object>
  createdAt?: string
  updatedAt?: string
}

export interface IStatusBoxProperties {
  amountInBox?: number
  boxLengthCm?: number
  boxWidthCm?: number
  boxHeightCm?: number
  boxWeighGrossKg?: number
}

export interface IProductsStatusPaymentsMethod {
  _id?: string

  title?: string

  iconImage?: string

  createdAt?: string

  updatedAt?: string
}
