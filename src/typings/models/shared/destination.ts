import { IName } from './name'

export interface IDestination {
  _id?: string
  name?: string
  country?: string
  zipCode?: string
  state?: string
  city?: string
  address?: string
  storekeeper?: IName
  isActive?: boolean
  createdById?: string
  lastModifiedById?: string
  fontColor?: string
  createdAt?: string
  updatedAt?: string
}
