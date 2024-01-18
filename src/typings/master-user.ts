import { UploadFileType } from './upload-file'

export interface IShortUser {
  _id: string
  name: string
  rating: number
  lastSeen: string
}

export interface IService {
  createdBy: IShortUser
  createdAt: string
  linksToMediaFiles: UploadFileType[]
  requests: Array<Requests>
  type: number
  description: string
  title: string
  updatedAt: string
  _id: string
}

export interface Requests {
  createdBy: IShortUser
  humanFriendlyId: number
  price: number
  status: string
  timeoutAt: string
  title: string
  updatedAt: string
  _id: string
}
