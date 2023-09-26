export interface ShortUserType {
  _id: string
  name: string
  rating: number
}

export interface linksToMediaFilesInterface {
  file: File
  data_url: string
}

export interface IService {
  createdBy: ShortUserType
  createdAt: string
  linksToMediaFiles: Array<string | linksToMediaFilesInterface>
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
