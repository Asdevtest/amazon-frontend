import { IMessage } from './message'

export interface IChat {
  _id: string
  crmItemId?: string
  crmItemType?: string
  isBlocked: boolean
  blockedById?: string
  isActual?: boolean
  lastUpdatedById: string
  createdAt: string
  updatedAt: string
  lastUpdatedBy: {
    _id: string
    [x: string]: unknown
  }
  users: ChatUser[]
  messages: IMessage[]
  pagination: { limit: number; offset: number }
}

interface ChatUser {
  _id: string
  [x: string]: unknown
}
