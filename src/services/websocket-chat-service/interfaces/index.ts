import {ChatHandlerName} from '../event-handler-mappings'

export interface WebsocketChatServiceHandlers {
  [ChatHandlerName.onPong]?: (result: string) => void
  [ChatHandlerName.onConnect]?: () => void
  [ChatHandlerName.onConnectionError]?: (error: Error) => void
  [ChatHandlerName.onNewMessage]?: (message: ChatMessage) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string | symbol]: ((...args: any[]) => void) | undefined
}

export type WebsocketChatServiceHandlersAllValues = {
  [P in keyof WebsocketChatServiceHandlers]: WebsocketChatServiceHandlers[P]
}[keyof WebsocketChatServiceHandlers]

export interface SendMessageRequestParams {
  chatId: string
  text: string
  images?: string[]
  files?: any[]
  is_draft?: boolean
}

export interface ChatMessage {
  _id: string
  userId: string
  chatId: string
  text: string
  type: string
  images: string[]
  files: string[]
  is_draft?: boolean
  createdAt: string
  updatedAt: string
}

export interface ChatUser {
  _id: string
  [x: string]: unknown
}

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
  users: ChatUser[]
  messages: ChatMessage[]
}

export interface WebsocketChatResponse<T> {
  data?: T
  error?: string | null
  success: boolean
}
