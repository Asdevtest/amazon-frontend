import { ICreatedBy } from '@typings/shared/created-by'

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
}

export interface IPaymentMethod {
  _id: string
  title: string
  iconImage: string
}
