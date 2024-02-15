import { ChatMessageDataUniversal } from '@services/websocket-chat-service/interfaces'

export interface IMessage<T extends ChatMessageDataUniversal = ChatMessageDataUniversal> {
  _id: string
  userId: string
  chatId: string
  isRead: boolean
  text: string
  type: string
  images: string[]
  files: string[]
  video: string[]
  is_draft: boolean
  createdAt: string
  updatedAt: string
  info: {
    image: string
    title: string
    type: string
  }
  data: T
  replyMessage: IMessage
}
