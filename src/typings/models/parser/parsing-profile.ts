import { ICreatedBy } from '@typings/shared/created-by'

export interface IParsingProfile {
  access: boolean
  client: ICreatedBy | null
  createdAt: string
  email: string
  gologinId: string
  isActive: boolean
  name: string
  passwordHash: string
  shop: ICreatedBy | null
  updatedAt: string
  _id: string
}
