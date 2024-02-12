import { IBox } from './box'
import { ICreatedBy } from './created-by'
import { IName } from './name'

export interface ITask {
  _id?: string
  createdAt?: number
  updatedAt?: number
  operationType?: string
  status?: number
  isBarCodeAttached?: boolean
  priority?: number
  reason?: string
  storekeeper?: ICreatedBy
  boxes?: Array<IBox>
  boxesBefore?: Array<IBox>
  createdBy?: IName
  role?: number
  subUser?: IName
  entityId?: string
  paymentType?: string
  recipient?: IName
  sum?: number
  comment?: string
}
