import { IPermission } from './permission'

export interface IPermissions {
  _id: string
  key: string
  title: string
  description: string
  hierarchy: number
  permissions: Array<IPermission>
  role: number
  createdById: string
  lastModifiedById: string
  createdAt: string
  updatedAt: string
}
