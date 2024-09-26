import { ChatMessageUsers } from '../data-chat-message.type'

export interface RemoveUsersFromGroupChat {
  createdBy: string
  title: string
  users: ChatMessageUsers[]
}
