import { IBatchesBoxes } from './batches-by-product'

export interface IBatchesByGuid {
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
  boxes?: Array<IBatchesBoxes>
  calculationMethod?: number
  volumeWeightDivide?: number
  finalWeight?: number
  storekeeper?: IBatchesStorekeeper
  createdBy?: IBatchesStorekeeper
  lastModifiedBy?: IBatchesStorekeeper
  arrivalDate?: string
  createdAt?: string
  updatedAt?: string
}

export interface IBatchesStorekeeper {
  _id?: string
  name: string
}
