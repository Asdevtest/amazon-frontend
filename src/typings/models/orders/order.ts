import { IPayment } from '@typings/shared/payment'

import { ICreatedBy } from '../../shared/created-by'
import { IDestination } from '../../shared/destinations'
import { ILogicTariff } from '../../shared/logic-tariff'
import { IVariationTariff } from '../../shared/variation-tariff'
import { IProduct } from '../products/product'
import { ISupplier } from '../suppliers/supplier'

export interface IOrder {
  id: number
  _id: string
  asin: string
  clientComment: string
  trackingNumberChina: string
  item: string
  buyerComment: string
  status: number
  images: string[]
  priority: string
  totalPrice: number
  totalPriceChanged: number
  paidAt: string
  paymentDateToSupplier: string
  partialPaymentAmountRmb: number
  partiallyPaid: number
  partialPayment: boolean
  yuanToDollarRate: number
  deliveryCostToTheWarehouse: number
  transparencyFile: string
  productId: string
  logicsTariffId: string
  variationTariffId: string | null
  buyerId: string
  amount: number
  expressChinaDelivery: boolean
  needsResearch: boolean
  deadline: string | null
  createdById: string
  createdAt: string
  updatedAt: string
  variationTariff: IVariationTariff
  destination: IDestination
  logicsTariff: ILogicTariff
  product: IProduct
  storekeeper: ICreatedBy
  buyer: ICreatedBy
  orderSupplier: ISupplier
  createdBy: ICreatedBy
  priceInYuan: number
  paymentDetailsAttached: boolean
  payments: Array<IPayment>
  paymentDetails: Array<string>
}
