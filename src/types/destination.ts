export interface DestinationType {
  _id: string
  name: string
  country: string
  zipCode: string
  state: string
  city: string
  address: string
  storekeeper: {
    _id: string
    name: string
  }
  isActive: boolean
  createdById: string
  lastModifiedById: string
  fontColor: string
  createdAt: string
  updatedAt: string
}

export interface RequestProposalType {}

export interface DestinationVariationType {
  destination: {
    name: string
    _id: string
  }
  minWeight: number
  maxWeight: number
  pricePerKgRmb: number
  pricePerKgUsd: number
}

export interface DestinationVariationApproximateCalculationsType extends DestinationVariationType {
  _id: string
  roi: number
  costDeliveryToUsa: number
}
