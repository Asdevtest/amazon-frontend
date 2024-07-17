import { IVariationDestination } from './destinations'

export interface ILogicTariff {
  tariffType: number
  name: string
  description: string
  deliveryTimeInDay: string
  cls: string
  etd: string
  eta: string
  minWeightInKg: number
  archive: boolean
  conditionsByRegion: IConditionsByRegion
  destinationVariations: Array<IDestinationVariation>
  _id: string
  storekeeperId: string
  updatedAt: string
  createdAt: string
  avgRoi: number
  avgCostUnitWithDeliveryToUsa: number
  costUnitWithDeliveryToChina: number
  yuanToDollarRate?: number // remove
}

export interface IConditionsByRegion {
  west: IRegion
  central: IRegion
  east: IRegion
  yuanToDollarRate: number
}

interface IRegion {
  rate: number
}

interface IDestinationVariation {
  _id: string
  minWeight: number
  maxWeight: number
  minBoxWeight: number
  pricePerKgRmb: number
  pricePerKgUsd: number
  storekeeperTariffLogisticsId: string
  destination: IVariationDestination
}
