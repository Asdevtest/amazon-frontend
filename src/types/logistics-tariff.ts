import { DestinationVariationType } from './destination'

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
  destinationVariations: Array<DestinationVariationType>
  _id: string
  storekeeperId: string
  updatedAt: string
  id: string
}
