import { IRequestItem } from './request'

interface ICustomRequest {
  request?: IRequestItem

  details?: ICustomRequestDetails
}

export interface ICustomRequestDetails {
  conditions?: string

  linksToMediaFiles?: Array<string>

  createdById?: string

  lastModifiedById?: string

  createdAt?: string
  atedAt?: string
}
