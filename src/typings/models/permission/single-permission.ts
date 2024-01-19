interface ISinglePermission {
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

export interface IPermissionAllowedUrls {
  url?: string

  httpMethod?: IPermissionHttpMethodEnum
}

export enum IPermissionHttpMethodEnum {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
}
