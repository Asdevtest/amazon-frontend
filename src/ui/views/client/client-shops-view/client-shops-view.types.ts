import { IShop } from '@typings/models/shops/shop'

export interface IColumnProps {
  onRemoveShop: (id: string) => void
  onEditShop: (row: IShop) => void
  onParsingProfile: (id: string) => void
  onParsingAccess: (email: string) => void
  onParsingStatus: (id: string, isActive: boolean) => void
}

export type RequestStatusType = 'PENDING' | 'REJECTED' | 'APPROVED'

export enum RequestStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}

export interface IShopProfile {
  access: boolean
  email: string
  isActive: boolean
  requestStatus: RequestStatusType
}
