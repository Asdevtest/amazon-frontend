import { ICreatedBy } from '@typings/shared/created-by'

export interface IFeedback {
  _id: string
  title: string
  status: number
  xid: number
  text: string
  media: string[]
  responseText: string
  responseMedia: string[]
  user: ICreatedBy
  moderator: ICreatedBy
  createdAt: string
  updatedAt: string
}
