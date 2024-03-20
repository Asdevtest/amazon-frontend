import { ICreatedBy } from '../../shared/created-by'
import { IName } from '../../shared/name'
import { IBox } from '../boxes/box'

export interface ITask {
  _id: string
  createdAt: number
  updatedAt: number
  operationType: string
  status: number
  isBarCodeAttached: boolean
  priority: number
  reason: string
  storekeeper: ICreatedBy
  boxes: Array<IBox>
  boxesBefore: Array<IBox>
  createdBy: IName
  role: number
  subUser: IName
  entityId: string
  paymentType: string
  recipient: IName
  sum: number
  comment: string
  taskId: number
  storekeeperComment: string
  clientComment: string
  buyerComment: string
  images: Array<string>
  storekeeperId: string
  updateDate: string
}
