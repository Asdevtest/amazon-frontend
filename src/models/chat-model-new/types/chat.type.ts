import { IFullUser } from '@typings/shared/full-user'

import { ChatMessage } from './message.type'

export interface Chat {
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
  users: IFullUser[]
  messages: ChatMessage[]
  pagination: { limit: number; offset: number }
}
