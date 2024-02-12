import { ICreatedBy } from '../shared/created-by'
import { IOrder } from '../shared/order'
import { IProduct } from '../shared/product'
import { ISupplier } from '../shared/supplier'

export interface IIdea {
  _id?: string
  title?: string
  status?: number
  linksToMediaFiles?: Array<string>
  fbaFee?: number
  approximatePrice?: number
  productName?: string
  variation?: boolean
  childProduct?: IProduct
  suppliers?: Array<ISupplier>
  requestsOnCheck?: Array<ApiV1IdeasByParentGuidRequestsOnCheck>
  requestsOnFinished?: Array<ApiV1IdeasByParentGuidRequestsOnCheck>
  comments?: string
  buyerComment?: string
  intervalStatusNew?: number
  intervalStatusOnCheck?: number
  intervalStatusSupplierSearch?: number
  intervalStatusSupplierFound?: number
  intervalStatusSupplierNotFound?: number
  intervalStatusProductCreating?: number
  intervalStatusAddingAsin?: number
  intervalStatusRejected?: number
  intervalsSum?: number
  createdAt?: string
  updatedAt?: string
  productLinks?: Array<string>
  criteria?: string
  quantity?: number
  price?: number
  width?: number
  height?: number
  length?: number
  dateStatusOnCheck?: string
  dateStatusSupplierSearch?: string
  dateStatusSupplierFound?: string
  dateStatusSupplierNotFound?: string
  dateStatusProductCreating?: string
  dateStatusAddingAsin?: string
  dateStatusFinished?: string
  dateStatusRejected?: string
  dateStatusClosed?: string
  order?: IOrder
  parentProduct?: IProduct
}

export interface ApiV1IdeasByParentGuidRequestsOnCheck {
  _id?: string
  humanFriendlyId?: number
  title?: string
  status?: string
  typeTask?: number
  proposals?: Array<IIdeasByParentProposals>
  executor?: ICreatedBy
}

export interface IIdeasByParentProposals {
  _id?: string
}

export interface IIdeasByParentPriceVariations {
  price?: number
  quantity?: number
}
