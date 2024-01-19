import { IStatusCreatedBy } from '../shared/created-by'

export interface IAnnoucements {
  _id?: string
  type?: string
  requests?: IAnnouncementsMyRequests[]
  linksToMediaFiles?: string[]
  title?: string
  description?: string
  createdBy?: IStatusCreatedBy
  createdAt?: string
  updatedAt?: string
}

export interface IAnnouncementsMyRequests {
  _id?: string
  title?: string
  humanFriendlyId?: number
  price?: number
  status?: string
  timeoutAt?: string
  createdBy?: IStatusCreatedBy
  updatedAt?: string
}
