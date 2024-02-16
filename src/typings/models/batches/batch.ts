import { IName } from '../../shared/name'
import { IBox } from '../boxes/box'

export interface IBatch {
  _id: string
  humanFriendlyId: number
  status: string
  shipId: string
  title: string
  calculatedShippingCost: number
  actualShippingCost: number
  trackingNumber: string
  attachedDocuments: Array<string>
  finalWeightAsOneBox: number
  finalWeightSumEachBoxAmount: number
  archive: boolean
  boxes: Array<IBox>
  calculationMethod: number
  volumeWeightDivide: number
  finalWeight: number
  storekeeper: IName
  createdBy: IName
  lastModifiedBy: IName
  arrivalDate: string
  createdAt: string
  updatedAt: string
}
