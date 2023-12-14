import { ProposalStatusEnum } from '@constants/statuses/proposal-status'

import { IShortUser } from './master-user'

export interface IRequestProposals {
  proposal?: IProposal
  details?: IProposalsDetails
  request?: IProposalsRequest
}

export interface IProposal {
  _id?: string
  requestId?: string
  type?: string
  status?: ProposalStatusEnum
  timeoutAt?: string
  execution_time?: number
  attempts?: number
  price?: number
  comment?: string
  linksToMediaFiles?: string[]
  clientId?: string
  supervisorId?: string
  chatId?: string
  lastModifiedById?: string
  sub?: IShortUser
  sourceFiles?: ISourceFiles[]
  media?: IProposalsMedia[]
  createdAt?: string
  updatedAt?: string
  title?: string
  approvedByMaster?: boolean
  createdBy?: IShortUser
}

export interface ISourceFiles {
  sourceFile?: string

  comments?: string
}

export interface IProposalsMedia {
  _id?: string
  fileLink?: string
  commentByPerformer?: string
  commentByClient?: string
}

export interface IProposalsDetails {
  result?: string
  linksToMediaFiles?: string[]
  amazonOrderId?: string
  publicationLinks?: string[]
}

export interface IProposalsRequest {
  humanFriendlyId?: number
  taskComplexity?: number
  asin?: string
  createdBy?: IShortUser
}
