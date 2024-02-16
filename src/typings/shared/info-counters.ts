import { IPermission } from '@typings/models/permissions/permission'
import { IPermissionGroup } from '@typings/models/permissions/permission-group'

import { IName } from './name'
import { ISpec } from './spec'

export interface IInfoCounters {
  _id: string
  name: string
  email: string
  role: number
  fba: boolean
  active: boolean
  rate: number
  balance: number
  balanceFreeze: number
  overdraft: number
  permissions: Array<IPermission>
  permissionGroups: Array<IPermissionGroup>
  masterUser: IName
  allowedRoles: Array<number>
  allowedStrategies: Array<number>
  canByMasterUser: boolean
  rating: number
  createdAt: string
  updatedAt: string
  needConfirmPriceChange: INeedConfirmPriceChange
  needUpdateTariff: INeedUpdateTariff
  purchaseOrderRequired: Array<string>
  updatesOnIdeas: number
  allowedSpec: Array<ISpec>
  tasksNewAll: number
  tasksAtProcessAll: number
  tasksNewHigh: number
  tasksAtProcessHigh: number
  freeOrders: number
  orders: number
  pendingOrders: number
  allOrders: number
  pendingOrdersByDeadline: number
  notPaid: number
  readyForPayment: number
  partiallyPaid: number
  needTrackNumber: number
  inbound: number
  confirmationRequired: number
  closedAndCanceled: number
  allProducts: number
  rejectedBySupervisor: number
  vacFromResearcher: number
  vacFromClient: number
  searchFromSupervisor: number
  searchFromClient: number
  onCheckWithSupervisor: number
  atTheBuyerInWork: number
  searchComplete: number
  supplierWasNotFound: number
  supplierPriceDoesNotFit: number
  paidByTheClient: number
  productIsAppropriate: number
  buyerFoundSupplier: number
  vacantRequests: number
  myProposals: IMyProposals
  ideas: IIdeas
  freelanceNotices: Array<IFreelanceNotice>
  notificationCounter: number
}

interface INeedConfirmPriceChange {
  boxes: number
  orders: number
}

interface INeedUpdateTariff {
  boxes: number
}

interface IFreelanceNotice {
  unreadMessages: number
  chatId: string
  request: IRequest
}

interface IRequest {
  _id: string
  title: string
  asin: string
  humanFriendlyId: number
  spec: ISpec
}

interface IIdeas {
  _new: number
  onCheck: number
  supplierSearch: number
  productCreating: number
  addingAsin: number
  finished: number
  rejectedOrClosed: number
}

interface IMyProposals {
  CREATED: number
  OFFER_CONDITIONS_ACCEPTED: number
  OFFER_CONDITIONS_CORRECTED: number
  READY_TO_VERIFY: number
  TO_CORRECT: number
  CORRECTED: number
}
