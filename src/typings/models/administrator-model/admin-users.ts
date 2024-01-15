export interface IAdminsUser {
  _id: string
  name: string
  email: string
  role: number
  fba: boolean
  active: boolean
  rate: number
  balance?: number
  balanceFreeze?: number
  overdraft?: number
  masterUser?: string
  allowedRoles?: number[]
  allowedStrategies?: number[]
  canByMasterUser?: boolean
  rating?: number
  hideSuppliers?: boolean
  allowedSpec?: number[]
  createdAt?: string
  updatedAt?: string
}
