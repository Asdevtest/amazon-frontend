import { ICreatedBy } from '../../shared/created-by'
import { ISpec } from '../../shared/spec'
import { IAnnoucement } from '../announcements/annoucement'
import { IProduct } from '../products/product'

import { IRequestMedia } from './request-media'

export interface IRequest {
  _id: string
  humanFriendlyId: number
  type: string
  priority: number
  withoutConfirmation: boolean
  title: string
  maxAmountOfProposals: number
  price: number
  taskComplexity: number
  status: string
  timeoutAt: string
  timeLimitInMinutes: number
  assignees: Array<string>
  direction: string
  roles: Array<number>
  needCheckBySupervisor: boolean
  restrictMoreThanOneProposalFromOneAssignee: boolean
  createdById: string
  lastModifiedById: string
  typeTask: number
  productId: string
  asin: string
  priceAmazon: number
  cashBackInPercent: number
  announcementId: string
  createdAt: string
  updatedAt: string
  uploadedToListing: boolean
  media: Array<IRequestMedia>
  announcement: IAnnoucement
  sub: ICreatedBy
  executor: ICreatedBy
  createdBy: ICreatedBy
  countProposalsByStatuses: ICountProposalsByStatuses
  product: IProduct
  spec: ISpec
}

interface ICountProposalsByStatuses {
  allProposals: number
  waitedProposals: number
  atWorkProposals: number
  verifyingProposals: number
  acceptedProposals: number
}
