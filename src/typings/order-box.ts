import { IDestination, IDestinationVariationApproximateCalculations } from './destination'
import { IConditionsByRegion } from './logistics-tariff'
import { IShortUser } from './master-user'

export interface IOrderBox {
  variationTariffId: string
  tmpShippingLabel: string
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
  referenceId: null | string
  clientComment: null | string
  storekeeperComment: null | string
  lengthCmWarehouse: number
  widthCmWarehouse: number
  heightCmWarehouse: number
  weighGrossKgWarehouse: number
  isShippingLabelAttachedByStorekeeper: boolean
  fbaShipment: string
  fbaNumber: string
  deliveryTotalPrice: number
  deliveryTotalPriceChanged: number
  images: string[]
  deadline: null | string
  createdAt: string
  updatedAt: string
  variationTariff: null | IDestinationVariationApproximateCalculations
  items: IOrderBoxItem[]
  sub: IShortUser | null
  storekeeper: IShortUser | null
  client: IShortUser | null
  createdBy: IShortUser | null
  destination: null | IDestination
  logicsTariff: IOrderBoxlogicsTariff
  batch: IOrderBoxBatch
  volumeWeightKgWarehouse: number
  weightFinalAccountingKgWarehouse: number
  destinationId: string
  storekeeperId: string
  logicsTariffId: string
}

export interface IOrderBoxItem {
  amount: number
  barCode: string
  isBarCodeAttachedByTheStorekeeper: boolean
  isBarCodeAlreadyAttachedByTheSupplier: boolean
  product: IOrderBoxItemProduct
  order: IOrderBoxItemOrder
}

export interface IOrderBoxItemProduct {
  _id: string
  asin: string
  skuByClient: string
  images: string[]
  shopIds: string[]
  amazonTitle: string
  barCode: string
  hsCode: string
  subUsers: IShortUser[]
}

export interface IOrderBoxItemOrder {
  _id: string
  id: number
  item: string
  clientComment: string
  orderSupplier: IOrderSupplier
  priority: string
}

export interface IOrderSupplier {
  _id: string
  price: number
  amount: number
  yuanRate: number
  batchDeliveryCostInDollar: number
  batchDeliveryCostInYuan: number
  batchTotalCostInDollar: number
  batchTotalCostInYuan: number
  boxProperties: IBoxProperties
}

export interface IBoxProperties {
  amountInBox: number
  boxLengthCm: number
  boxWidthCm: number
  boxHeightCm: number
  boxWeighGrossKg: number
}

export interface IOrderBoxlogicsTariff {
  _id: string
  name: string
  conditionsByRegion: IConditionsByRegion
}

export interface IOrderBoxBatch {
  _id: string
  humanFriendlyId: number
  status: string
}
