import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

export interface ChatMessagesType {
  rows: ChatMessageContract[]
  offset: number
  count: number
}
