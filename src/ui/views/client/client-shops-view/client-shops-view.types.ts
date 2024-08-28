import { ProfileRequestStatus, ProfileStatus } from '@typings/enums/request/profile-request-status'
import { IShop } from '@typings/models/shops/shop'

export interface IColumnProps {
  onRemoveShop: (id: string) => void
  onEditShop: (row: IShop) => void
  onParsingProfile: (id: string) => void
  onParsingAccess: (email: string) => void
  onParsingStatus: (id: string, isActive: boolean) => void
  onParsingProfileInvited: (id: string) => void
}

export interface IShopProfile {
  access: boolean
  email: string
  isActive: boolean
  requestStatus: ProfileRequestStatus
  status: ProfileStatus
  _id: string
}
