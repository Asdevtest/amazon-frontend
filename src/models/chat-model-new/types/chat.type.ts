import { ChatsType } from '@constants/keys/chats'

import { IFullUser } from '@typings/shared/full-user'

import { ChatMessage } from './message.type'

export interface ChatPagination {
  limit: number
  offset: number

  hasMoreTop: boolean
  hasMoreBottom: boolean
}

export interface ChatInfo {
  image: string
  title: string
  createdBy?: string
}

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
  messagesCount: number

  info: ChatInfo | null

  pagination: ChatPagination

  muted: boolean

  blockedById?: string
  isActual?: boolean
  crmItemId?: string
  crmItemType?: string
  unread: string
}
