import { ICountry } from '@typings/shared/country'
import { ICreatedBy } from '@typings/shared/created-by'

import { ISupplierEmployee } from './supplier-employee'

export interface ISupplierV2 {
  _id: string
  companyName: string
  xid: number
  link: string
  images: string[]
  comment: string
  createdBy: ICreatedBy
  totalCountCards: number
  totalCountInOrder: number
  totalAmountInYuan: number
  totalAmountInUsd: number
  totalCountFeedback: number
  avgRating: number
  paymentMethods: IPaymentMethod[]
  createdAt: string
  updatedAt: string
  supplierEmployees: ISupplierEmployee[]
  originCountry: ICountry
}

export interface ISupplierV2Light {
  _id: string
  companyName: string
  xid: number
  images: string[]
  avgRating: number
}

export interface IPaymentMethod {
  _id: string
  title: string
  iconImage: string
}
