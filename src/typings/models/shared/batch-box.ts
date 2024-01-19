import { IProduct } from '@typings/product'

import { IStatusCreatedBy } from './created-by'
import { ILogicTariffs } from './logic-tariffs'
import { IOrder, IOrderDestination } from './order'
import { StatusEnum } from './statuses'

export interface IBatchesBox {
  _id?: string
  humanFriendlyId?: number
  amount?: number
  status?: StatusEnum
  isActual?: boolean
  isDraft?: boolean
  fbaShipment?: string
  fbaNumber?: string
  shippingLabel?: string
  lengthCmSupplier?: number
  widthCmSupplier?: number
  heightCmSupplier?: number
  isFormed?: boolean
  weighGrossKgSupplier?: number
  lengthCmWarehouse?: number
  widthCmWarehouse?: number
  heightCmWarehouse?: number
  weighGrossKgWarehouse?: number
  isShippingLabelAttachedByStorekeeper?: boolean
  images?: Array<string>
  deliveryTotalPrice?: number
  deliveryTotalPriceChanged?: number
  destinationId?: string
  logicsTariffId?: string
  batchId?: string
  clientComment?: string
  referenceId?: string
  storekeeperComment?: string
  trackNumberText?: string
  upsTrackNumber?: string
  trackNumberFile?: Array<string>
  prepId?: string
  storekeeperId?: string
  clientId?: string
  createdById?: string
  lastModifiedById?: string
  createdAt?: string
  updatedAt?: string
  lastRateTariff?: number
  variationTariff?: ITaskLightVariationTariff
  items?: Array<ApiV1BatchesItems>
  storekeeper?: IStatusCreatedBy
  client?: IStatusCreatedBy
  createdBy?: IStatusCreatedBy
  lastModifiedBy?: IStatusCreatedBy
  destination?: IOrderDestination
  logicsTariff?: ILogicTariffs
  batch?: IBatch
}

export interface ITaskLightVariationTariff {
  _id?: string
  storekeeperTariffLogisticsId?: string
  destinationId?: string
  minWeight?: number
  maxWeight?: number
  pricePerKgRmb?: number
  pricePerKgUsd?: number
}

export interface ApiV1BatchesItems {
  _id?: string
  product?: IProduct
  amount?: number
  order?: IOrder
  barCode?: string
  isBarCodeAttachedByTheStorekeeper?: boolean
  isBarCodeAlreadyAttachedByTheSupplier?: boolean
  transparencyFile?: string
  isTransparencyFileAttachedByTheStorekeeper?: boolean
  isTransparencyFileAlreadyAttachedByTheSupplier?: boolean
}

interface IBatch {
  _id?: string
  humanFriendlyId?: number
  status?: string
  shipId?: string
  attachedDocuments?: Array<string>
  finalWeightAsOneBox?: number
  finalWeightSumEachBoxAmount?: number
  storekeeperId?: string
  createdById?: string
  createdAt?: string
  updatedAt?: string
}
