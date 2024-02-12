import { IPermission } from '../models/permissions/permission'
import { IPermissionGroup } from '../models/permissions/permission-group'

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
  permissions: Array<IPermission>
  permissionGroups: Array<IPermissionGroup>
  masterUser: string
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
