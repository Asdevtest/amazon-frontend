import { IFullUser } from '@typings/shared/full-user'

import { ChatMessageType } from './chat-message.type'
import { ChatMessageData } from './data-chat-message.type'

export interface ResponseChats<T> {
  rows: T
  offset: number
  count: number
}

export interface ForwardedMessage {
  _id: string
  chatId: string
  user: IFullUser
}

export interface ChatMessage<T extends ChatMessageData = ChatMessageData> {
  _id: string
  replyMessageId: string | null
  text: string
  type: ChatMessageType
  data: T
  images: string[]
  files: string[]
  video: string[]
  isRead: boolean
  createdAt: string
  updatedAt: string
  replyMessage: ChatMessage<T> | null
  forwardedMessage: ForwardedMessage | null
  user: IFullUser
}
