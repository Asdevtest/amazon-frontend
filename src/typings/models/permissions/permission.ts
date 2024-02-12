export interface IPermission {
  _id: string
  key: string
  title: string
  description: string
  allowedUrls: Array<IAllowedUrls>
  role: number
  hierarchy: number
  createdById: string
  lastModifiedById: string
  createdAt: string
  updatedAt: string
}

interface IAllowedUrls {
  url: string
  httpMethod: string
}
