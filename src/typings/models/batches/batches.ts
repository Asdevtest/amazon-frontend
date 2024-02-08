import { IBox } from '../shared/box'

export interface IBatches {
  _id?: string
  humanFriendlyId?: number
  status?: string
  shipId?: string
  title?: string
  calculatedShippingCost?: number
  actualShippingCost?: number
  trackingNumber?: string
  attachedDocuments?: Array<string>
  finalWeightAsOneBox?: number
  finalWeightSumEachBoxAmount?: number
  archive?: boolean
  boxes?: Array<IBox>
  calculationMethod?: number
  volumeWeightDivide?: number
  finalWeight?: number
  storekeeper?: ApiV1BatchesStorekeeper
  createdBy?: ApiV1BatchesStorekeeper
  lastModifiedBy?: ApiV1BatchesStorekeeper
  arrivalDate?: string
  createdAt?: string
  updatedAt?: string
}

export interface ApiV1BatchesStorekeeper {
  _id?: string
  name: string
}
