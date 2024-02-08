import { IMasterUser } from '../shared/master-user'

export interface IFeedback {
  _id?: string
  text?: string
  media?: object[] // нет в схеме, добавить по возможнсти
  user?: IMasterUser
  updatedAt?: string
}
