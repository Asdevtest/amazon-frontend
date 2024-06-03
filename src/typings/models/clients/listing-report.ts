import { Launches } from '@typings/enums/launches'
import { ICreatedBy } from '@typings/shared/created-by'

import { IProduct } from '../products/product'
import { IRequest } from '../requests/request'

export interface IListingLaunch {
  type: Launches
  value: number
  dateFrom: string | null
  dateTo: string | null
  comment: string
  requestId: string | null
  result: string
  _id?: string
  expired?: boolean
  request?: IRequest
  createdAt?: string
  updatedAt?: string
}

export interface IListingReport {
  _id: string
  createdBy: ICreatedBy
  sub: ICreatedBy
  product: IProduct
  isActive: boolean
  newProductPrice: number
  description: string
  listingLaunches: IListingLaunch[]
  createdAt: string
  updatedAt: string
}
