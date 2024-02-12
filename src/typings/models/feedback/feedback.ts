import { ICreatedBy } from '../shared/created-by'

export interface IFeedback {
  _id?: string
  createdBy?: ICreatedBy
  role?: number
  comment?: string
  rating?: number
  sub?: ICreatedBy
  createdAt?: string
}
