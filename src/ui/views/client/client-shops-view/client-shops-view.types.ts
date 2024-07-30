import { IShop } from '@typings/models/shops/shop'

export interface IColumnProps {
  onRemoveShop: (id: string) => void
  onEditShop: (row: IShop) => void
  onConfirmProfile: (id: string) => void
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
