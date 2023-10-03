import { IUploadFile } from './upload-file'

export interface ShortUserType {
  _id: string
  name: string
  rating: number
}

export interface IService {
  createdBy: ShortUserType
  createdAt: string
  linksToMediaFiles: Array<string | IUploadFile>
  requests: Array<Requests>
  type: number
  description: string
  title: string
  updatedAt: string
  _id: string
}

export interface Requests {
  createdBy: ShortUserType
  humanFriendlyId: number
  price: number
  status: string
  timeoutAt: string
  title: string
  updatedAt: string
  _id: string
}
