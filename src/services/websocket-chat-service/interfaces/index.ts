import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'

import {
  ChatMessageDataBloggerProposalResultEditedContract,
  ChatMessageDataCreateNewBloggerProposalContract,
  ChatMessageDataDesignerProposalResultEditedContract,
  ChatMessageDataProposalBloggerProposalResultEdited,
  ChatMessageDataProposalCreateNewBloggerProposalContract,
  ChatMessageDataProposalDesignerProposalResultEdited,
  ChatMessageDataRequestDesignerProposalContract,
} from '@models/chat-model/contracts/chat-message-data.contract'

import { ChatHandlerName } from '../event-handler-mappings'

export interface WebsocketChatServiceHandlers {
  [ChatHandlerName.onPong]?: (result: string) => void
  [ChatHandlerName.onConnect]?: () => void
  [ChatHandlerName.onConnectionError]?: (error: Error) => void
  [ChatHandlerName.onNewMessage]?: (message: ChatMessage) => void
  // [ChatHandlerName.onNewChat]?: (chat: Chat) => void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string | symbol]: ((...args: any[]) => void) | undefined
}

export type WebsocketChatServiceHandlersAllValues = {
  [P in keyof WebsocketChatServiceHandlers]: WebsocketChatServiceHandlers[P]
}[keyof WebsocketChatServiceHandlers]

export interface SendMessageRequestParams {
  chatId: string
  text: string
  files: string[]
  images?: string[]

  is_draft?: boolean
  replyMessageId?: string | null
}

export interface AddUsersToGroupChatParams {
  chatId: string
  users: string[]
}

export interface RemoveUsersFromGroupChatParams {
  chatId: string
  users: string[]
}

export interface patchInfoGroupChatParams {
  chatId: string
  title: string
  image: string
}

export interface TypingMessageRequestParams {
  chatId: string
}

export interface OnReadMessageResponse {
  chatId: string
  messagesId: string[]
}

export interface OnTypingMessageResponse {
  chatId: string
  userId: string
}

export interface ChatMessage<T extends ChatMessageDataUniversal = ChatMessageDataUniversal> {
  _id: string
  userId: string
  chatId: string
  isRead: boolean
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
  'CREATED_NEW_BLOGGER_PROPOSAL' = 'CREATED_NEW_BLOGGER_PROPOSAL',
  'CREATED_NEW_DESIGNER_PROPOSAL' = 'CREATED_NEW_DESIGNER_PROPOSAL',
  'BLOGGER_PROPOSAL_RESULT_EDITED' = 'BLOGGER_PROPOSAL_RESULT_EDITED',
  'DESIGNER_PROPOSAL_RESULT_EDITED' = 'DESIGNER_PROPOSAL_RESULT_EDITED',
  'PROPOSAL_EDITED' = 'PROPOSAL_EDITED',
  'SYSTEM' = 'system:default',
  'USER' = 'user:default',
}

export enum ChatMessageTextType {
  'ADD_USERS_TO_GROUP_CHAT_BY_ADMIN' = 'ADD_USERS_TO_GROUP_CHAT_BY_ADMIN',
  'REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN' = 'REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN',
  'PATCH_INFO' = 'PATCH_INFO',
}

export type ChatMessageDataUniversal =
  | ChatMessageDataCreatedNewProposalProposalDescription
  | ChatMessageDataCreatedNewProposalRequestDescription
  | ChatMessageDataProposalStatusChanged
  | ChatMessageDataProposalResultEdited
  | ChatMessageDataAddUsersToGroupChat
  | ChatMessageRemoveUsersFromGroupChat
  | ChatMessagePatchInfoGroupChat
  | ChatMessageDataCreateNewBloggerProposalContract
  | ChatMessageDataBloggerProposalResultEditedContract
  | ChatMessageDataDesignerProposalResultEditedContract
  | undefined

export interface ChatMessageDataCreatedNewProposalProposalDescription {
  _id: string
  execution_time: number
  price: number
  comment: string
  status: string
}

export interface ChatMessageDataCreatedNewProposalRequestDescriptionDetails {
  conditions: string
}

export interface ChatMessageDataCreatedNewProposalRequestDescription {
  _id: string
  title: string
  timeoutAt: string
  status: string
  price: string
  details: ChatMessageDataCreatedNewProposalRequestDescriptionDetails
}

export interface ChatMessageDataAddUsersToGroupChat {
  createdBy: string
  title: string
  users: { _id: string; name: string }[]
}

export interface ChatMessageRemoveUsersFromGroupChat {
  createdBy: string
  title: string
  users: { _id: string; name: string }[]
}

export interface ChatMessagePatchInfoGroupChat {
  createdBy: string
  title: string
  updatedData: { image: string; title: string }
  prevData: { image: string; title: string }
}

export interface ChatMessageDataProposalStatusChanged {
  status: string
  reason: string
  linksToMediaFiles: string[]
  timeLimitInMinutes?: number
}

export interface ChatMessageDataProposalResultEditedEdited {
  linksToMediaFiles?: { fileLink: string; commentByPerformer: string }[] | string[]
  result: string
  media?: { commentByPerformer: string; fileLink: string; index: number; _id: string }[]
}

export interface ChatMessageDataProposalResultEditedRequest {
  _id: string
  price: number
  status: keyof typeof RequestStatus
  title: string
  media?: { fileLink: string; commentByClient: string }[] | string[]
}

export interface ChatMessageDataRequestCreateNewBloggerProposal {
  _id: string
  price: number
  status: keyof typeof RequestStatus
  title: string

  details: { conditions: string; linksToMediaFiles: [string] }

  media: { fileLink: string; commentByClient: string }[]

  createdBy: { _id: string }
  timeoutAt: string
  priceAmazon: number
  cashBackInPercent: number
}

export interface ChatMessageDataRequestCreateNewDesignerProposal {
  _id: string
  price: number
  status: keyof typeof RequestStatus
  title: string

  details: { conditions: string; linksToMediaFiles: [string] }
  media: { fileLink: string; commentByClient: string }[]

  createdBy: { _id: string }
  timeoutAt: string
  priceAmazon: number
  cashBackInPercent: number
}

export interface ChatMessageDataRequestDesignerProposal {
  asin: string
}

export interface ChatMessageDataProposalCreateNewBloggerProposal {
  _id: string
  comment: string
  linksToMediaFiles: [string]
  execution_time: number

  price: number
  status: keyof typeof RequestStatus
  title: string
}

export interface ChatMessageDataProposalCreateNewDesignerProposal {
  _id: string
  comment: string
  linksToMediaFiles: [string]
  execution_time: number

  price: number
  status: keyof typeof RequestStatus
  title: string
}

export interface ChatMessageDataProposalBloggerProposalResultEditedProposal {
  _id: string
  details: { amazonOrderId: string | null; linksToMediaFiles: [string]; publicationLinks: [string]; result: string }
}

export interface ChatMessageDataProposalDesignerProposalResultEditedProposal {
  _id: string
  comment: string

  execution_time: number
  title: string
  media: { fileLink: string }[]
}

export interface ChatMessageDataProposalResultEditedProposal {
  _id: string
  status: keyof typeof RequestProposalStatus
}

export interface ChatMessageDataProposalEditedContract {
  comment: string
  execution_time: number
  linksToMediaFiles: string[]
  price: number
  title: string
}

export interface ChatMessageDataProposalResultEdited {
  needApproveBy: Array<string>
  edited: ChatMessageDataProposalResultEditedEdited
  request: ChatMessageDataProposalResultEditedRequest
  proposal: ChatMessageDataProposalResultEditedProposal
}

export interface ChatMessageDataCreateNewBloggerProposal {
  request: ChatMessageDataProposalResultEditedRequest
  proposal: ChatMessageDataProposalCreateNewBloggerProposalContract
}

export interface ChatMessageDataCreateNewDesignerProposal {
  request: ChatMessageDataProposalResultEditedRequest
  proposal: ChatMessageDataProposalCreateNewBloggerProposalContract
}

export interface ChatMessageDataBloggerProposalResultEdited {
  proposal: ChatMessageDataProposalBloggerProposalResultEdited
}

export interface ChatMessageDataDesignerProposalResultEdited {
  proposal: ChatMessageDataProposalDesignerProposalResultEdited
  request: ChatMessageDataRequestDesignerProposalContract
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
  pagination: { limit: number; offset: number }
}

export interface WebsocketChatResponse<T> {
  data?: T
  error?: string | null
  success: boolean
}
