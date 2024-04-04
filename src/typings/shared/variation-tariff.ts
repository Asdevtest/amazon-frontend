import { IDestinationVariationWithCalculations } from './destinations'
import { IConditionsByRegion } from './logic-tariff'

export interface IVariationTariff {
  _id: string
  pricePerKgRmb: number
  pricePerKgUsd: number
  destinationId: string
}

export interface ITariffsWithCalculations {
  _id: string
  tariffType: number
  name: string
  description: string
  deliveryTimeInDay: string
  storekeeperId: string
  cls: string
  etd: string
  eta: string
  minWeightInKg: number
  archive: boolean
  conditionsByRegion: IConditionsByRegion
  costUnitWithDeliveryToChina: number
  destinationVariations: IDestinationVariationWithCalculations[]
  updatedAt: string
  createdAt: string
}
