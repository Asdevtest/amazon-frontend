import { IName } from './name'

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
}

interface IConditionsByRegion {
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
  pricePerKgRmb: number
  pricePerKgUsd: number
  destination: IName
}
