import { HttpMethods } from '@typings/enums/http'

export interface IPermission {
  _id: string
  key: string
  title: string
  description: string
  allowedUrls: Array<IAllowedUrl>
  createdById: string
  role: number
  hierarchy?: number
  lastModifiedById?: string
  createdAt: string
  updatedAt: string
}

export interface IAllowedUrl {
  url?: string
  httpMethod?: HttpMethods
}
