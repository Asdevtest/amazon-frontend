import { ChatsType } from '@constants/keys/chats'

import { IFullUser } from '@typings/shared/full-user'

import { ChatMessage } from './message.type'

export interface Chat {
  _id: string

  isBlocked: boolean

  lastUpdatedById: string
  createdAt: string
  updatedAt: string

  lastUpdatedBy: {
    _id: string
    [x: string]: unknown
  }

  users: IFullUser[]
  messages: ChatMessage[]
  lastMessage: ChatMessage
  type: ChatsType

  info: {
    image: string
    title: string
    createdBy?: string
  } | null

  pagination: {
    limit: number
    offset: number
    offsetBottom: number
    isAllNextMessagesLoaded: boolean
    isAllPreviousMessagesLoaded: boolean
  }

  blockedById?: string
  isActual?: boolean
  crmItemId?: string
  crmItemType?: string
}
