import { ICreatedBy } from '../shared/created-by'
import { IDestination } from '../shared/destination'
import { ILogicTariff } from '../shared/logic-tariff'

interface IBatchesByProduct {
  _id?: string
  humanFriendlyId?: number
  title?: string
  archive?: boolean
  boxes?: Array<IBatchesBoxes>
  amountInBatch?: number
  storekeeper?: ICreatedBy
}

export interface IBatchesBoxes {
  humanFriendlyId?: number
  shippingLabel?: string
  fbaShipment?: string
  fbaNumber?: string
  trackNumberText?: string
  trackNumberFile?: Array<string>
  prepId?: string
  upsTrackNumber?: string
  destination?: IDestination
  logicsTariff?: ILogicTariff
  boxAmount?: number
  itemAmount?: number
}
