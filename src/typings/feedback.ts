import { UserRolePrettyMap } from '@constants/keys/user-roles'

import { IShortUser } from '@typings/master-user'

export interface FeedbackType {
  _id: string
  rating: number
  createdBy: IShortUser
  sub: IShortUser
  comment: string
  createdAt: string
  role: keyof typeof UserRolePrettyMap
}
