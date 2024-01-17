import { IBox } from '../boxes/box-by-id'

export interface ILightTasks {
  _id?: string
  createdAt?: number
  updatedAt?: number
  operationType?: string
  status?: number
  isBarCodeAttached?: boolean
  priority?: number
  reason?: string
  storekeeper?: ILightTasksStorekeeper
  boxes?: Array<IBox>
  boxesBefore?: Array<IBox>
}

export interface ILightTasksStorekeeper {
  _id?: string
  name?: string
  rating?: number
}
