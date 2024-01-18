import { IDestination, IDestinationVariationApproximateCalculations } from './destination'
import { ILogisticTariff } from './logistics-tariff'
import { IShortUser } from './master-user'
import { IProduct, ISupplier } from './product'

export interface IOrder {
  amount: number
  buyer: IShortUser
  buyerComment: string
  buyerId: string
  clientComment: string
  createdAt: string
  createdBy: IShortUser
  createdById: string
  deadline: string | null
  deliveryCostToTheWarehouse: number
  destination: IDestination
  expressChinaDelivery: boolean
  id: number
  images: string[]
  item: string
  logicsTariff: ILogisticTariff
  logicsTariffId: string | null
  needsResearch: boolean
  orderSupplier: ISupplier
  paidAt: string
  partialPayment: boolean
  partialPaymentAmountRmb: boolean
  partiallyPaid: number
  paymentDateToSupplier: string
  paymentDetails: string[]
  priority: string
  product: IProduct
  productId: string
  status: number
  storekeeper: IShortUser
  totalPrice: number
  totalPriceChanged: number
  trackingNumberChina: string
  transparencyFile: string
  updatedAt: string
  variationTariff: IDestinationVariationApproximateCalculations
  variationTariffId: string | null
  yuanToDollarRate: number
  _id: string
}
