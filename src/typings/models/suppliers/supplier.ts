import { ICreatedBy } from '../../shared/created-by'
import { IPaymentMethod } from '../../shared/payment-method'

export interface ISupplier {
  _id: string
  name: string
  link: string
  price: number
  amount: number
  minlot: number
  images: Array<string>
  comment: string
  yuanRate: number
  minProductionTerm: number
  maxProductionTerm: number
  multiplicity: boolean
  priceInYuan: number
  batchDeliveryCostInDollar: number
  batchDeliveryCostInYuan: number
  batchTotalCostInDollar: number
  batchTotalCostInYuan: number
  boxProperties: IBoxProperties
  productionTerm: number
  createdBy: ICreatedBy
  paymentMethods: IPaymentMethod[]
  priceVariations: Array<object>
  createdAt: string
  updatedAt: string
  imageUnit: string[]
  heightUnit: number
  widthUnit: number
  lengthUnit: number
  weighUnit: number
}

export interface IBoxProperties {
  amountInBox: number
  boxLengthCm: number
  boxWidthCm: number
  boxHeightCm: number
  boxWeighGrossKg: number
}
