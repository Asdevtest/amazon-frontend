import { IFullUser } from '@typings/shared/full-user'
import { UploadFileType } from '@typings/shared/upload-file'

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

export interface SendMessage {
  chatId: string
  text: string
  files: (string | UploadFileType)[]
  replyMessageId: string
  forwardedMessageId: string
  user: IFullUser
}

export interface emitSendMessage {
  chatId: string
  text?: string
  files?: string[]
  images?: string[]
  video?: string[]
  user: IFullUser
  // replyMessageId?: string
  // forwardedMessageId?: string
}
