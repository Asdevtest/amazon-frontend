import { ICreatedBy } from '../../shared/created-by'
import { IBox } from '../boxes/box'

export interface IBatchByProduct {
  _id: string
  humanFriendlyId: number
  title: string
  archive: boolean
  boxes: Array<IBox>
  amountInBatch: number
  storekeeper: ICreatedBy
}
