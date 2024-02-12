import { ICreatedBy } from '../../shared/created-by'
import { IDestination } from '../../shared/destinations'
import { IName } from '../../shared/name'
import { IVariationTariff } from '../../shared/variation-tariff'
import { IBatch } from '../batches/batch'

import { IBoxItem } from './box-item'

export interface IBox {
  _id: string
  humanFriendlyId: number
  amount: number
  status: string
  isActual: boolean
  isDraft: boolean
  isFormed: boolean
  shippingLabel: string
  trackNumberText: string
  trackNumberFile: string[]
  prepId: string
  upsTrackNumber: string
  referenceId: string
  clientComment: string
  storekeeperComment: string
  lengthCmWarehouse: number
  widthCmWarehouse: number
  heightCmWarehouse: number
  weighGrossKgWarehouse: number
  isShippingLabelAttachedByStorekeeper: boolean
  fbaShipment: string
  fbaNumber: string
  images: string[]
  updatedAt: string
  variationTariff: IVariationTariff
  items: IBoxItem[]
  sub: ICreatedBy
  storekeeper: ICreatedBy
  client: ICreatedBy
  destination: IDestination
  logicsTariff: IName
  batch: IBatch
  boxAmount: number
  itemAmount: number
  deliveryTotalPrice: number
  deliveryTotalPriceChanged: number
  destinationId: string
  logicsTariffId: string
  batchId: string
  lengthCmSupplier: number
  widthCmSupplier: number
  heightCmSupplier: number
  weighGrossKgSupplier: number
  storekeeperId: string
  clientId: string
  createdById: string
  lastModifiedById: string
  createdAt: string
  lastRateTariff: number
  createdBy: ICreatedBy
  lastModifiedBy: ICreatedBy
  deadline: string
}
