export interface ILogicTariffs {
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

export interface ILogicsTariffConditionsByRegion {
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

export interface ILogicTariffsDestination {
  _id?: string
  name?: string
}
