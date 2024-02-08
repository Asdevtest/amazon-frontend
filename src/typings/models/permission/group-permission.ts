import { IPermissionAllowedUrls } from './single-permission'

export interface PermissionGroupGetDtoSchema {
  _id?: string

  key: string

  title: string

  description: string

  hierarchy?: number

  permissions: Array<PermissionGroupGetDtoSchemaPermissions>

  role: number

  createdById: string

  lastModifiedById?: string

  createdAt: string

  updatedAt: string
}

export interface PermissionGroupGetDtoSchemaPermissions {
  _id: string

  key: string

  title: string

  description: string

  allowedUrls: Array<IPermissionAllowedUrls>

  role: number

  hierarchy?: number

  createdById: string

  lastModifiedById?: string

  createdAt: string

  updatedAt: string
}
