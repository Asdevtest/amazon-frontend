import { ILogisticTariff } from './logistics-tariff'
import { IShortUser } from './master-user'

export interface IDestination {
  _id: string
  name: string
  country: string
  zipCode: string
  state: string
  city: string
  address: string
  storekeeper: IShortUser
  isActive: boolean
  createdById: string
  lastModifiedById: string
  fontColor: string
  createdAt: string
  updatedAt: string
}

export interface IDestinationVariation {
  _id: string
  minWeight: number
  maxWeight: number
  pricePerKgRmb: number
  pricePerKgUsd: number
  destination: {
    _id: string
    name: string
  }
}

export interface IDestinationVariationApproximateCalculations extends IDestinationVariation {
  _id: string
  roi: number
  costDeliveryToUsa: number
  destinationId: string | null
}

export interface IDestinationStorekeeper {
  _id: string
  name: string
  tariffLogistics: ILogisticTariff[]
  tariffWarehouses: []
  boxesCount: 0
}
