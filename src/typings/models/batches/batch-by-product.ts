import { IBox } from '../shared/box'
import { ICreatedBy } from '../shared/created-by'

export interface IBatchByProduct {
  _id?: string
  humanFriendlyId?: number
  title?: string
  archive?: boolean
  boxes?: Array<IBox>
  amountInBatch?: number
  storekeeper?: ICreatedBy
}
