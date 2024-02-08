import { IClientsLightBatch } from '../boxes/boxes-for-curr-clients-light'

import { IBoxItem } from './box-item'
import { ICreatedBy } from './created-by'
import { IDestination } from './destination'
import { IName } from './name'
import { IVariationTariff } from './variation-tariff'

export interface IBox {
  _id?: string
  humanFriendlyId?: number
  amount?: number
  status?: string // change to status enum
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
  variationTariff?: IVariationTariff
  items?: IBoxItem[]
  sub?: ICreatedBy
  storekeeper?: ICreatedBy
  client?: ICreatedBy
  destination?: IDestination
  logicsTariff?: IName
  batch?: IClientsLightBatch
}
