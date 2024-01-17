import { IProduct } from '@typings/product'

import { ITaskLightVariationTariff } from '../shared/batch-box'
import { IStatusCreatedBy } from '../shared/created-by'
import { ILogicsTariffConditionsByRegion } from '../shared/logic-tariffs'
import { IOrder } from '../shared/order'

export interface IBoxesCurrClient {
  count?: number
  rows?: IBoxCurr[]
}

export interface IBoxCurr {
  _id?: string
  humanFriendlyId?: number
  amount?: number
  status?: string
  isActual?: boolean
  isDraft?: boolean
  isFormed?: boolean
  shippingLabel?: string
  trackNumberText?: string
  trackNumberFile?: string[]
  prepId?: string
  upsTrackNumber?: string
  referenceId?: string
  clientComment?: string
  storekeeperComment?: string
  lengthCmWarehouse?: number
  widthCmWarehouse?: number
  heightCmWarehouse?: number
  weighGrossKgWarehouse?: number
  isShippingLabelAttachedByStorekeeper?: boolean
  fbaShipment?: string
  fbaNumber?: string
  deliveryTotalPrice?: number
  deliveryTotalPriceChanged?: number
  images?: string[]
  deadline?: string
  createdAt?: string
  updatedAt?: string
  variationTariff?: ITaskLightVariationTariff
  items?: IClientsLightItems[]
  sub?: IStatusCreatedBy
  storekeeper?: IStatusCreatedBy
  client?: IStatusCreatedBy
  createdBy?: IStatusCreatedBy
  destination?: IClientsLightDestination
  logicsTariff?: IClientsLightLogicTariffs
  batch?: IClientsLightBatch
}

export interface IClientsLightItems {
  amount?: number
  barCode?: string
  isBarCodeAttachedByTheStorekeeper?: boolean
  isBarCodeAlreadyAttachedByTheSupplier?: boolean
  transparencyFile?: string
  isTransparencyFileAttachedByTheStorekeeper?: boolean
  isTransparencyFileAlreadyAttachedByTheSupplier?: boolean
  product?: IProduct
  order?: IOrder
}

export interface IClientsLightDestination {
  _id?: string
  name?: string
  zipCode?: string
  storekeeperId?: string
}

export interface IClientsLightLogicTariffs {
  _id?: string
  name: string
  conditionsByRegion: ILogicsTariffConditionsByRegion
}

export interface IClientsLightBatch {
  _id?: string
  humanFriendlyId?: number
  status?: string
}
