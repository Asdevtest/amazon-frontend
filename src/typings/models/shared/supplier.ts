import { ICreatedBy } from './created-by'
import { IPaymentMethod } from './payment-method'

export interface ISupplier {
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
  boxProperties?: IBoxProperties
  productionTerm?: number
  createdBy?: ICreatedBy
  paymentMethods?: IPaymentMethod
  priceVariations?: Array<object>
  createdAt?: string
  updatedAt?: string
}

export interface IBoxProperties {
  amountInBox?: number
  boxLengthCm?: number
  boxWidthCm?: number
  boxHeightCm?: number
  boxWeighGrossKg?: number
}
