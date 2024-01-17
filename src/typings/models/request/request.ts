import { IStatusCreatedBy } from '../shared/created-by'

interface IRequest {
  count?: number

  rows?: Array<IRequestItem>
}

export interface IRequestItem {
  _id: string
  humanFriendlyId?: number
  type: string
  priority?: number
  withoutConfirmation?: boolean
  title?: string
  maxAmountOfProposals: number
  price: number
  taskComplexity?: number
  status: IStatusEnum
  timeoutAt?: string
  timeLimitInMinutes?: number
  assignees?: Array<string>
  direction: IRequestDirectionEnum
  roles?: Array<number>
  needCheckBySupervisor?: boolean
  restrictMoreThanOneProposalFromOneAssignee?: boolean
  createdById?: string
  lastModifiedById?: string
  typeTask?: number
  productId?: string
  asin?: string
  priceAmazon?: number
  cashBackInPercent?: number
  announcementId?: string
  createdAt?: string
  updatedAt?: string
  uploadedToListing?: boolean
  media?: Array<IRequestMedia>
  announcement?: IRequestAnnouncement
  sub?: IStatusCreatedBy
  executor?: IStatusCreatedBy
  createdBy?: IStatusCreatedBy
  countProposalsByStatuses?: IRequestCountProposalsByStatuses
  product?: IRequestProduct
}

export interface IRequestProduct {
  _id?: string

  asin?: string

  skuByClient?: string

  images?: Array<string>

  amazonTitle?: string

  subUsers?: Array<IStatusCreatedBy>

  shopId?: string
}

export interface IRequestMedia {
  _id?: string
  fileLink?: string
  commentByClient?: string
  commentByPerformer?: string
}

export interface IRequestAnnouncement {
  createdBy?: IStatusCreatedBy
}

export interface IRequestCountProposalsByStatuses {
  allProposals?: number

  waitedProposals?: number

  atWorkProposals?: number

  verifyingProposals?: number

  acceptedProposals?: number
}

export enum IStatusEnum {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  InProcess = 'IN_PROCESS',
  ForbidNewProposals = 'FORBID_NEW_PROPOSALS',
  CompleteProposalsAmountAchieved = 'COMPLETE_PROPOSALS_AMOUNT_ACHIEVED',
  CanceledByCreator = 'CANCELED_BY_CREATOR',
  Expired = 'EXPIRED',
  ReadyToVerifyByAdmin = 'READY_TO_VERIFY_BY_ADMIN',
  VerifyingByAdmin = 'VERIFYING_BY_ADMIN',
  ToCorrectByAdmin = 'TO_CORRECT_BY_ADMIN',
  CanceledByAdmin = 'CANCELED_BY_ADMIN',
  ReadyToVerifyBySupervisor = 'READY_TO_VERIFY_BY_SUPERVISOR',
  VerifyingBySupervisor = 'VERIFYING_BY_SUPERVISOR',
  ToCorrectBySupervisor = 'TO_CORRECT_BY_SUPERVISOR',
}

export enum IRequestDirectionEnum {
  In = 'IN',
  Out = 'OUT',
}
