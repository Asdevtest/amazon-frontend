export interface DestinationVariationInterface {
  destinationId: string
  minWeight: number
  maxWeight: number
  pricePerKgRmb: number
  pricePerKgUsd: number
}

export interface LogisticTariffInterface {
  name: string
  tariffType: number
  description: string
  deliveryTimeInDay: string
  cls: string
  etd: string
  eta: string
  minWeightInKg: number
  archive: boolean
  conditionsByRegion: {
    west: {
      rate: number
    }
    central: {
      rate: number
    }
    east: {
      rate: number
    }
    yuanToDollarRate: number
  }
  destinationVariations: Array<DestinationVariationInterface>
  _id: string
  storekeeperId: string
  updatedAt: string
  id: string
}
