import { IBatches } from '../batches/batches'
import { ITaskLightVariationTariff } from '../shared/batch-box'
import { ICreatedBy } from '../shared/created-by'
import { IDestination } from '../shared/destination'
import { ILogicTariff } from '../shared/logic-tariff'

export interface IBoxesStorekeepersSent {
  _id?: string
  humanFriendlyId?: number
  amount?: number
  status?: string // changed to enum
  isActual?: boolean
  isDraft?: boolean
  isFormed?: boolean
  lengthCmWarehouse?: number
  widthCmWarehouse?: number
  heightCmWarehouse?: number
  weighGrossKgWarehouse?: number
  deliveryTotalPrice?: number
  deliveryTotalPriceChanged?: number
  destinationId?: string
  logicsTariffId?: string
  batchId?: string
  storekeeperId?: string
  clientId?: string
  createdById?: string
  lastModifiedById?: string
  variationTariff?: ITaskLightVariationTariff
  createdAt?: string
  updatedAt?: string
  items?: Array<IStorekeeperSentToBatchItem>
  storekeeper?: ICreatedBy
  client?: ICreatedBy
  createdBy?: ICreatedBy
  lastModifiedBy?: ICreatedBy
  destination?: IDestination
  logicsTariff?: ILogicTariff
  batch?: IBatches
}

export interface IStorekeeperSentToBatchItem {
  _id?: string
  amount?: number
  order?: IStorekeeperSentToBatchOrder
  product?: object
}

export interface IStorekeeperSentToBatchOrder {
  _id?: string
  id?: number
  item?: string
}
