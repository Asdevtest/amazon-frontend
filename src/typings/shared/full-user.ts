import { IMasterUser } from './master-user'
import { ISpec } from './spec'

export interface IFullUser {
  _id: string
  name: string
  email: string
  role: number
  fba: boolean
  active: boolean
  isUserPreprocessingCenterUSA: boolean
  rate: number
  balance: number
  balanceFreeze: number
  overdraft: number
  permissions: string[]
  permissionGroups: string[]
  masterUser: IMasterUser
  allowedStrategies: Array<number>
  allowedRoles: Array<number>
  canByMasterUser: boolean
  rating: number
  subUsers: Array<IMasterUser>
  masterUserInfo: IMasterUser
  allowedSpec: ISpec[]
  hideSuppliers: boolean
  createdAt: string
  updatedAt: string
}
