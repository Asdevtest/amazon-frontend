import { IBox } from './box'
import { ICreatedBy } from './created-by'

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
}
