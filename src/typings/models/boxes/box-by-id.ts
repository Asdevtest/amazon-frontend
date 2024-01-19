import { ITaskLightVariationTariff } from '../shared/batch-box'
import { IStatusCreatedBy } from '../shared/created-by'
import { IOrderDestinationStorekeeper, IPriorityEnum } from '../shared/order'
import { StatusEnum } from '../shared/statuses'

import { IClientsLightBatch } from './boxes-for-curr-clients-light'

export interface IBox {
  _id?: string
  humanFriendlyId?: number
  amount?: number
  status?: StatusEnum
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
  images?: string[]
  updatedAt?: string
  variationTariff?: ITaskLightVariationTariff
  items?: IBoxItems[]
  sub?: IStatusCreatedBy
  storekeeper?: IStatusCreatedBy
  client?: IStatusCreatedBy
  destination?: IBoxDestionation
  logicsTariff?: ILogicsTariff
  batch?: IClientsLightBatch
}

export interface ILogicsTariff {
  _id?: string
  name?: string
}

export interface IBoxItems {
  _id?: string
  amount?: number
  barCode?: string
  isBarCodeAttachedByTheStorekeeper?: boolean
  isBarCodeAlreadyAttachedByTheSupplier?: boolean
  transparencyFile?: string
  isTransparencyFileAttachedByTheStorekeeper?: boolean
  isTransparencyFileAlreadyAttachedByTheSupplier?: boolean
  product?: IProduct
  order?: IBoxOrder
}

export interface IProduct {
  _id?: string
  asin?: string
  skuByClient?: string
  shopId?: string
  images?: Array<string>
  amazonTitle?: string
  barCode?: string
  hsCode?: string
}

export interface IBoxOrder {
  _id?: string
  id?: number
  priority?: IPriorityEnum
}

export interface IBoxDestionation {
  _id?: string
  name?: string
  storekeeper?: IOrderDestinationStorekeeper
}
