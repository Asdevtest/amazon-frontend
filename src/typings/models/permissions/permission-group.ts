import { IPermission } from './permission'

export interface IPermissionGroup {
  _id: string
  key: string
  title: string
  description: string
  permissions: Array<IPermission>
  role: number
  hierarchy: number
  createdById: string
  lastModifiedById: string
  createdAt: string
  updatedAt: string
}
