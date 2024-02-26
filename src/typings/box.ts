export interface IBox {
  _id?: string
  humanFriendlyId?: number
  amount?: number
  status?: Status
  isActual?: boolean
  isDraft?: boolean
  isFormed?: boolean
  shippingLabel?: string
  trackNumberText?: string
  trackNumberFile?: Array<string>
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
  images?: Array<string>
  updatedAt?: string
  variationTariff?: IVariationTariff
  items?: IItem[]
  sub?: IUserShort
  storekeeper?: IUserShort
  client?: IUserShort
  destination?: IDestination
  logicsTariff?: ILogicsTariff
  batch?: IBatch
}

enum Status {
  New = 'NEW',
  InStock = 'IN_STOCK',
  RequestedSendToBatch = 'REQUESTED_SEND_TO_BATCH',
  NeedConfirmingToDeliveryPriceChange = 'NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE',
  InBatch = 'IN_BATCH',
  NeedToUpdateTheTariff = 'NEED_TO_UPDATE_THE_TARIFF',
  InBatchOnTheWay = 'IN_BATCH_ON_THE_WAY',
  FinishPrepCentrUsa = 'FINISH_PREP_CENTR_USA',
  AcceptedInProcessing = 'ACCEPTED_IN_PROCESSING',
}

interface IVariationTariff {
  _id?: string
  storekeeperTariffLogisticsId?: string
  destinationId?: string
  minWeight?: number
  maxWeight?: number
  pricePerKgRmb?: number
  pricePerKgUsd?: number
}

interface IItem {
  _id?: string
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

interface IProduct {
  _id?: string
  asin?: string
  skuByClient?: string
  shopId?: string
  images?: Array<string>
  amazonTitle?: string
  barCode?: string
  hsCode?: string
}

interface IOrder {
  _id?: string
  id?: number
  priority?: Priority
}

enum Priority {
  _10 = '10',
  _20 = '20',
  _30 = '30',
  _40 = '40',
  _50 = '50',
}

interface IUserShort {
  _id?: string
  name?: string
  rating?: number
  lastSeen?: string
}

interface IDestination {
  _id?: string
  name?: string
  storekeeper?: IStorekeeper
}

interface IStorekeeper {
  _id?: string
  name?: string
}

interface ILogicsTariff {
  _id?: string
  name?: string
}

interface IBatch {
  _id?: string
  humanFriendlyId?: number
  status?: string
  shipId?: string
  attachedDocuments?: string[]
  finalWeightAsOneBox?: number
  finalWeightSumEachBoxAmount?: number
  storekeeperId?: string
  createdById?: string
  createdAt?: string
  updatedAt?: string
}
