import { IRedFlag } from '@typings/product'

import { IStatusCreatedBy } from '../shared/created-by'
import { IProductByStatusSupplier } from '../shared/order'
import { IStatusTags } from '../shared/status-tags'

export interface IVacProductByUserId {
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

  currentSupplier?: IProductByStatusSupplier

  currentSupplierId?: string

  createdBy?: IStatusCreatedBy

  checkedBy?: IStatusCreatedBy

  createdAt?: string

  updatedAt?: string

  checkedAt?: string

  buyer?: IStatusCreatedBy

  supervisorRate?: number

  buyerRate?: number

  redFlags?: Array<IRedFlag>

  tags?: Array<IStatusTags>

  strategyStatus?: number

  avgRevenue?: string

  avgBSR?: string

  avgPrice?: string

  avgReviews?: string
}
