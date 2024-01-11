import { IDestinationVariation } from './destination'

export interface LogisticTariffInterface {
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
  destinationVariations: IDestinationVariation[]
  _id: string
  storekeeperId: string
  updatedAt: string
  createdAt: string
}

export interface IConditionsByRegion {
  west: IOrdersLogicsTariffConditionsByRegion
  central: IOrdersLogicsTariffConditionsByRegion
  east: IOrdersLogicsTariffConditionsByRegion
  yuanToDollarRate?: number
}

export interface IOrdersLogicsTariffConditionsByRegion {
  rate: number
}
