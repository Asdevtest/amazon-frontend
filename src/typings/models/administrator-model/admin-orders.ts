import { IStatusCreatedBy } from '../shared/created-by'
import { ILogicTariffs } from '../shared/logic-tariffs'
import { IOrderDestination } from '../shared/order'

import { IProductsChecking } from './products-checking'

export interface IAdminOrders {
  id?: number
  _id?: string
  asin?: string
  clientComment?: string
  trackingNumberChina?: string
  item?: string
  buyerComment?: string
  status?: number
  images?: string[]
  priority?: IPriorityEnum
  totalPrice?: number
  totalPriceChanged?: number
  paidAt?: string
  paymentDateToSupplier?: string
  partialPaymentAmountRmb?: number
  partiallyPaid?: number
  partialPayment?: boolean
  yuanToDollarRate?: number
  deliveryCostToTheWarehouse?: number
  transparencyFile?: string
  productId?: string
  logicsTariffId?: string
  variationTariffId?: string
  buyerId?: string
  amount?: number
  expressChinaDelivery?: boolean
  needsResearch?: boolean
  deadline?: string
  createdById?: string
  createdAt?: string
  updatedAt?: string
  variationTariff?: IAdminOrderVariationTarif
  destination?: IOrderDestination
  logicsTariff?: ILogicTariffs
  product?: IProductsChecking
  storekeeper?: IStatusCreatedBy
  buyer?: IStatusCreatedBy
  orderSupplier?: IProductByStatusSupplier
  createdBy?: IStatusCreatedBy
}

export interface IAdminOrderVariationTarif {
  _id?: string
  pricePerKgRmb?: number
  pricePerKgUsd?: number
  destinationId?: string
}

export enum IPriorityEnum {
  _10 = '10',
  _20 = '20',
  _30 = '30',
  _40 = '40',
  _50 = '50',
}

export interface IProductByStatusSupplier {
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
  boxProperties?: IProductByStatusBoxProperties
  productionTerm?: number
  createdBy?: IStatusCreatedBy
  paymentMethods?: Array<IProductByStatusPaymentMethods>
  priceVariations?: Array<object>
  createdAt?: string
  updatedAt?: string
}

interface IProductByStatusBoxProperties {
  amountInBox?: number
  boxLengthCm?: number
  boxWidthCm?: number
  boxHeightCm?: number
  boxWeighGrossKg?: number
}

interface IProductByStatusPaymentMethods {
  _id?: string
  title?: string
  iconImage?: string
  createdAt?: string
  updatedAt?: string
}
