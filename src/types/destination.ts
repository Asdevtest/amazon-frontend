export interface DestinationInterface {
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
