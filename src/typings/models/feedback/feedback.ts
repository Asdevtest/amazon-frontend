import { ICreatedBy } from '../shared/created-by'

interface IFeedback {
  _id?: string
  createdBy?: ICreatedBy
  role?: number
  comment?: string
  rating?: number
  sub?: ICreatedBy
  createdAt?: string
}
