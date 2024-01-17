import { IStatusCreatedBy } from '../shared/created-by'

interface IFeedbackMy {
  _id?: string
  createdBy?: IStatusCreatedBy
  role?: number
  comment?: string
  rating?: number
  sub?: IStatusCreatedBy
  createdAt?: string
}
