import { ICreatedBy } from '@typings/shared/created-by'

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
