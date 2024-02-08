import { IDestination } from '@typings/destination'
import { IProduct } from '@typings/product'

import { ICreatedBy } from '../shared/created-by'

export interface IBuyerOrdersMy {
  id?: number
  _id?: string
  amount?: number
  clientComment?: string
  buyerComment?: string
  destination?: IDestination
  item?: string
  priceInYuan?: number
  partialPaymentAmountRmb?: number
  partialPayment?: boolean
  paymentDetailsAttached?: boolean
  partiallyPaid?: number
  payments?: Array<IBuyerOrdersPayments>
  orderSupplier?: IBuyersOrderSupplier
  priority?: string
  expressChinaDelivery?: boolean
  needsResearch?: boolean
  deadline?: string
  paymentDateToSupplier?: string
  totalPrice?: number
  totalPriceChanged?: number
  createdById?: string
  storekeeper?: ICreatedBy
  product?: IProduct
  status?: number
  createdAt?: string
  updatedAt?: string
}

export interface IBuyersOrderSupplier {
  _id?: string

  paymentMethods?: Array<IBuyersOrderPaymentMethod>

  productionTerm?: number
}

export interface IBuyerOrdersPayments {
  paymentMethod?: IBuyersOrderPaymentMethod
  paymentDetails?: string
  paymentImages?: Array<string>
}

export interface IBuyersOrderPaymentMethod {
  _id?: string
  title?: string
  iconImage?: string
}
