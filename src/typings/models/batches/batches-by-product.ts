import { IStatusCreatedBy } from '../shared/created-by'
import { ILogicTariffs, ILogicTariffsDestination } from '../shared/logic-tariffs'

interface IBatchesByProduct {
  _id?: string
  humanFriendlyId?: number
  title?: string
  archive?: boolean
  boxes?: Array<IBatchesBoxes>
  amountInBatch?: number
  storekeeper?: IStatusCreatedBy
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
  destination?: ILogicTariffsDestination
  logicsTariff?: ILogicTariffs
  boxAmount?: number
  itemAmount?: number
}
