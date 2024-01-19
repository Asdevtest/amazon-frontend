import { IProduct } from '@typings/product'

export interface IOrder {
  id?: number
  _id?: string
  asin?: string
  clientComment?: string
  trackingNumberChina?: string
  item?: string
  buyerComment?: string
  status?: number
  images?: string[]
  priority?: IPriorityEnum
  totalPrice?: number
  totalPriceChanged?: number
  paidAt?: string
  paymentDateToSupplier?: string
  partialPaymentAmountRmb?: number
  partiallyPaid?: number
  partialPayment?: boolean
  yuanToDollarRate?: number
  deliveryCostToTheWarehouse?: number
  transparencyFile?: string
  productId?: string
  logicsTariffId?: string
  variationTariffId?: string
  buyerId?: string
  amount?: number
  expressChinaDelivery?: boolean
  needsResearch?: boolean
  deadline?: string
  createdById?: string
  createdAt?: string
  updatedAt?: string
  variationTariff?: IAdminOrderVariationTarif
  destination?: IOrderDestination
  logicsTariff?: ILogicTariffs
  product?: IProduct
  storekeeper?: IProductsByStatusCreatedBy
  buyer?: IProductsByStatusCreatedBy
  orderSupplier?: IProductByStatusSupplier
  createdBy?: IProductsByStatusCreatedBy
}

export interface IAdminOrderVariationTarif {
  _id?: string
  pricePerKgRmb?: number
  pricePerKgUsd?: number
  destinationId?: string
}

export interface IOrderDestination {
  _id?: string
  name?: string
  country?: string
  zipCode?: string
  state?: string
  city?: string
  address?: string
  storekeeper?: IOrderDestinationStorekeeper
  isActive?: boolean
  createdById?: string
  lastModifiedById?: string
  fontColor?: string
  createdAt?: string
  updatedAt?: string
}

export interface IOrderDestinationStorekeeper {
  _id?: string
  name?: string
}

interface ILogicTariffs {
  tariffType?: number
  name: string
  description?: string
  deliveryTimeInDay?: string
  cls?: string
  etd?: string
  eta?: string
  minWeightInKg?: number
  archive?: boolean
  conditionsByRegion?: ILogicsTariffConditionsByRegion
  destinationVariations?: Array<ILogicsTariffDestinationVariations>
  _id?: string
  storekeeperId?: string
  updatedAt?: string
  createdAt?: string
}

interface ILogicsTariffConditionsByRegion {
  west: ILogicsTariffByRegionWest
  central: ILogicsTariffByRegionWest
  east: ILogicsTariffByRegionWest
  yuanToDollarRate?: number
}

interface ILogicsTariffByRegionWest {
  rate: number
}

interface ILogicsTariffDestinationVariations {
  _id?: string
  minWeight?: number
  maxWeight?: number
  pricePerKgRmb?: number
  pricePerKgUsd?: number
  destination?: ILogicTariffsDestination
}

interface ILogicTariffsDestination {
  _id?: string
  name?: string
}

export enum IPriorityEnum {
  _10 = '10',
  _20 = '20',
  _30 = '30',
  _40 = '40',
  _50 = '50',
}

export interface IProductByStatusSupplier {
  _id?: string
  name?: string
  link?: string
  price?: number
  amount?: number
  minlot?: number
  images?: Array<string>
  comment?: string
  yuanRate?: number
  multiplicity?: boolean
  priceInYuan?: number
  batchDeliveryCostInDollar?: number
  batchDeliveryCostInYuan?: number
  batchTotalCostInDollar?: number
  batchTotalCostInYuan?: number
  boxProperties?: IProductByStatusBoxProperties
  productionTerm?: number
  createdBy?: IProductsByStatusCreatedBy
  paymentMethods?: Array<IProductByStatusPaymentMethods>
  priceVariations?: Array<object>
  createdAt?: string
  updatedAt?: string
}

interface IProductsByStatusCreatedBy {
  _id?: string
  name?: string
  rating?: number
  lastSeen?: string
}

interface IProductByStatusBoxProperties {
  amountInBox?: number
  boxLengthCm?: number
  boxWidthCm?: number
  boxHeightCm?: number
  boxWeighGrossKg?: number
}

interface IProductByStatusPaymentMethods {
  _id?: string
  title?: string
  iconImage?: string
  createdAt?: string
  updatedAt?: string
}
