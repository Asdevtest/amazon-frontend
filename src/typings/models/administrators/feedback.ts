import { IMasterUser } from '../../shared/master-user'

export interface IFeedback {
  _id: string
  text: string
  media: object[]
  user: IMasterUser
  updatedAt: string
}
