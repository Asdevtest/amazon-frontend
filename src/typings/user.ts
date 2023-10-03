/* eslint-disable @typescript-eslint/no-explicit-any */
export type MyProposalsType = Record<string, number>

export interface IUser {
  active: boolean
  allOrders: number
  allowedRoles: number[]
  allowedStrategies: Record<string, number>[]
  balance: number
  balanceFreeze: number
  canByMasterUser: boolean
  createdAt: string
  email: string
  fba: boolean
  freelanceNotices: any[] // find and add
  ideas: Record<string, number>
  masterUser: string | undefined
  myProposals: MyProposalsType
  name: string
  needConfirmPriceChange: Record<string, number>
  needUpdateTariff: Record<string, number>
  orders: number
  overdraft: number
  pendingOrders: number
  permissionGroups: any[] // find and add
  permissions: any[] // find and add
  purchaseOrderRequired: Record<string, string>
  rate: number
  rating: number
  role: number
  updatedAt: Date
  updatesOnIdeas: number
  _id: string
  tasksAtProcessAll: any
  tasksNewAll: any
  freeOrders: any
  notificationCounter: number
}
