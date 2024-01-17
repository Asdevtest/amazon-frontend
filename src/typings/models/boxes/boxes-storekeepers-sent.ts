import { IBatches } from '../batches/batches'
import { ITaskLightVariationTariff } from '../shared/batch-box'
import { IStatusCreatedBy } from '../shared/created-by'
import { ILogicTariffs } from '../shared/logic-tariffs'
import { IOrderDestination } from '../shared/order'
import { StatusEnum } from '../shared/statuses'

export interface IBoxesStorekeepersSent {
  _id?: string
  humanFriendlyId?: number
  amount?: number
  status?: StatusEnum
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
  storekeeper?: IStatusCreatedBy
  client?: IStatusCreatedBy
  createdBy?: IStatusCreatedBy
  lastModifiedBy?: IStatusCreatedBy
  destination?: IOrderDestination
  logicsTariff?: ILogicTariffs
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
