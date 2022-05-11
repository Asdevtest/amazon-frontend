import {RequestStatus} from '@constants/request-status'

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

export interface ChatMessage<T extends ChatMessageDataUniversal = ChatMessageDataUniversal> {
  _id: string
  userId: string
  chatId: string
  text: string
  type: ChatMessageType
  images: string[]
  files: string[]
  is_draft?: boolean
  createdAt: string
  updatedAt: string
  data: T
}

export enum ChatMessageType {
  'CREATED_NEW_PROPOSAL_PROPOSAL_DESCRIPTION' = 'CREATED_NEW_PROPOSAL_PROPOSAL_DESCRIPTION',
  'CREATED_NEW_PROPOSAL_REQUEST_DESCRIPTION' = 'CREATED_NEW_PROPOSAL_REQUEST_DESCRIPTION',
  'PROPOSAL_STATUS_CHANGED' = 'PROPOSAL_STATUS_CHANGED',
  'PROPOSAL_RESULT_EDITED' = 'PROPOSAL_RESULT_EDITED',
}

export type ChatMessageDataUniversal =
  | ChatMessageDataCreatedNewProposalProposalDescription
  | ChatMessageDataCreatedNewProposalRequestDescription
  | ChatMessageDataProposalStatusChanged
  | ChatMessageDataProposalResultEdited
  | undefined

export interface ChatMessageDataCreatedNewProposalProposalDescription {
  _id: string
  execution_time: number
  price: number
  comment: string
  status: string
}

export interface ChatMessageDataCreatedNewProposalRequestDescription {
  _id: string
  title: string
  timeoutAt: string
  status: string
  price: string
}

export interface ChatMessageDataProposalStatusChanged {
  status: string
  reason: string
  linksToMediaFiles: string[]
  timeLimitInMinutes?: number
}

export interface ChatMessageDataProposalResultEditedEdited {
  linksToMediaFiles?: string[]
  result: string
}

export interface ChatMessageDataProposalResultEditedRequest {
  _id: string
  price: number
  status: keyof typeof RequestStatus
  title: string
}

export interface ChatMessageDataProposalResultEdited {
  edited: ChatMessageDataProposalResultEditedEdited
  request: ChatMessageDataProposalResultEditedRequest
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
