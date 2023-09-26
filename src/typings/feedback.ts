import { UserRolePrettyMap } from '@constants/keys/user-roles'

import { ShortUserType } from '@typings/master-user'

export interface FeedbackType {
  _id: string
  rating: number
  createdBy: ShortUserType
  sub: ShortUserType
  comment: string
  createdAt: string
  role: keyof typeof UserRolePrettyMap
}
