import { IRedFlag } from '@typings/product'

import { ICreatedBy } from '../shared/created-by'
import { ISupplier } from '../shared/supplier'
import { ITag } from '../shared/tag'

export interface IClientProductsVac {
  _id?: string
  category?: string
  bsr?: number
  asin?: string
  skuByClient?: string
  amazon?: number
  weight?: number
  fbaamount?: number
  status?: number
  images?: Array<string>
  priceForClient?: number
  currentSupplier?: ISupplier
  currentSupplierId?: string
  createdBy?: ICreatedBy
  checkedBy?: ICreatedBy
  createdAt?: string
  updatedAt?: string
  checkedAt?: string
  buyer?: ICreatedBy
  supervisorRate?: number
  buyerRate?: number
  redFlags?: Array<IRedFlag>
  tags?: Array<ITag>
  strategyStatus?: number
  avgRevenue?: string
  avgBSR?: string
  avgPrice?: string
  avgReviews?: string
}
