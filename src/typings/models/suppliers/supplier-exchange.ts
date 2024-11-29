import { ICategory } from '../../shared/category'
import { ICountry } from '../../shared/country'
import { IPaymentMethod } from '../../shared/payment-method'

import { IBoxProperties } from './supplier'

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
  archive: boolean
  _id: string
  xid: number
  cardName: string
  category: ICategory
  minlot: number
  priceInUsd: number
  images: string[]
  boxProperties: IBoxProperties
  isPrime: boolean
  createdAt: string
  status: number
  supplier: ISupplierExchange
  updatedAt: string
}
