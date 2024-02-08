import { IBox } from '../shared/box'
import { ICreatedBy } from '../shared/created-by'

interface ITaskMy {
  _id?: string
  taskId?: number
  operationType?: OperationEnum
  boxesBefore?: Array<IBox>
  boxes?: Array<IBox>
  status?: number
  priority?: number
  storekeeperComment?: string
  clientComment?: string
  buyerComment?: string
  images?: Array<string>
  storekeeperId?: string
  storekeeper?: ICreatedBy
  createdAt?: string
  updateDate?: string
}

export enum OperationEnum {
  Merge = 'merge',
  Split = 'split',
  Receive = 'receive',
}
