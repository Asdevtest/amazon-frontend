import { IBoxesStorekeepersSent } from '../boxes/boxes-storekeepers-sent'
import { ICreatedBy } from '../shared/created-by'

export interface ITaskVacant {
  _id?: string
  taskId?: number
  operationType?: ITaskVacantOperationEnum
  boxesBefore?: Array<IBoxesStorekeepersSent>
  boxes?: Array<IBoxesStorekeepersSent>
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

export enum ITaskVacantOperationEnum {
  Merge = 'merge',
  Split = 'split',
  Receive = 'receive',
}
