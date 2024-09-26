import { ChatMessageUsers } from '../data-chat-message.type'

export interface AddUsersToGroupChat {
  createdBy: string
  title: string
  users: ChatMessageUsers[]
}
