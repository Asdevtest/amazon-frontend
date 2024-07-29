import { ICreatedBy } from '@typings/shared/created-by'

import { IShop } from '../shops/shop'

export interface IParsingProfile {
  _id: string
  gologinId: string
  name: string
  email: string
  passwordHash: string
  client: ICreatedBy
  shop: IShop
  createdAt: string
  updatedAt: string
}
