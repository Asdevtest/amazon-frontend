import { ICreatedBy } from '@typings/shared/created-by'

import { IProduct } from '../products/product'

export interface IShop {
  _id: string
  name: string
  sellerBoardWarehouseReportUrlDaily: string
  sellerBoardWarehouseReportUrlMonthly: string
  reportAccountUrl: string
  ownerId: string
  createdById: string
  lastModifiedById: string
  createdAt: string
  updatedAt: string
  products?: IProduct[]
  selected?: boolean
}

export interface IShopExport {
  _id: string
  name: string
  country: string
  zipCode: string
  state: string
  city: string
  address: string
  storekeeper: ICreatedBy
  isActive: boolean
  createdById: string
  lastModifiedById: string
  fontColor: string
  createdAt: string
  updatedAt: string
}
