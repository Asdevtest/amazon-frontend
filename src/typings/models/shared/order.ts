import { ICreatedBy } from './created-by'
import { IDestination } from './destination'
import { ILogicTariff } from './logic-tariff'
import { IProduct } from './product'
import { ISupplier } from './supplier'
import { IVariationTariff } from './variation-tariff'

export interface IOrder {
  id?: number
  _id?: string
  asin?: string
  clientComment?: string
  trackingNumberChina?: string
  item?: string
  buyerComment?: string
  status?: number
  images?: string[]
  priority?: string // change to priority enum
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
  variationTariff?: IVariationTariff
  destination?: IDestination
  logicsTariff?: ILogicTariff
  product?: IProduct
  storekeeper?: ICreatedBy
  buyer?: ICreatedBy
  orderSupplier?: ISupplier
  createdBy?: ICreatedBy
}
