import { ICategory } from '@typings/shared/category'
import { ICountry } from '@typings/shared/country'

import { IPaymentMethod } from '../../shared/payment-method'

export interface ISupplierExchange {
  _id: string
  xid: number
  images: string[]
  comment: string
  originCountry: ICountry
  paymentMethods: IPaymentMethod[]
  totalCountCards: number
  totalCountFeedback: number
  avgRating: number
  supplierCards: ISupplierCard[]
  createdAt: string
  updatedAt: string
}

export interface ISupplierCard {
  _id: string
  xid: number
  cardName: string
  category: ICategory
  minlot: number
  priceInUsd: number
  images: string[]
  boxProperties: IBoxProperties
}

interface IBoxProperties {
  amountInBox: number
  boxLengthCm: number
  boxWidthCm: number
  boxHeightCm: number
  boxWeighGrossKg: number
}
