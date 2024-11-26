import { ICreatedBy } from '@typings/shared/created-by'

export interface ISupplierFeedback {
  _id: string
  rating: number
  comment: string
  createdBy: ICreatedBy
  createdById: string
  sub: ICreatedBy
  subId: string
  createdAt: string
  updatedAt: string
}
