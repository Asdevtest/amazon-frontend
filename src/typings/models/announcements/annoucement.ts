import { UploadFileType } from '@typings/shared/upload-file'

import { ICreatedBy } from '../../shared/created-by'
import { ISpec } from '../../shared/spec'

export interface IAnnoucement {
  _id: string
  spec: ISpec
  requests: Array<IAnnoucementRequest>
  linksToMediaFiles: Array<UploadFileType>
  title: string
  description: string
  createdBy: ICreatedBy
  createdAt: string
  updatedAt: string
}

export interface IAnnoucementRequest {
  _id: string
  title: string
  humanFriendlyId: number
  price: number
  status: string
  timeoutAt: string
  createdBy: ICreatedBy
  updatedAt: string
}
