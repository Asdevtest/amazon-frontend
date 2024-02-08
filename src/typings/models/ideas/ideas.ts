import { ICreatedBy } from '../shared/created-by'

export interface IIdeas {
  _id?: string
  title?: string
  status?: number
  linksToMediaFiles?: Array<string>
  fbaFee?: number
  approximatePrice?: number
  productName?: string
  variation?: boolean
  childProduct?: IIdeasByParentChildProduct
  suppliers?: Array<IIdeasByParentSuppliers>
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

export interface IIdeasByParentSuppliers {
  _id?: string

  name?: string

  link?: string

  price?: number

  amount?: number

  minlot?: number

  images?: Array<string>

  comment?: string

  batchDeliveryCostInDollar?: number

  productionTerm?: number

  batchTotalCostInDollar?: number

  priceVariations?: Array<IIdeasByParentPriceVariations>

  createdBy?: ICreatedBy

  updatedAt?: string
}

export interface IIdeasByParentChildProduct {
  _id?: string

  asin?: string

  skuByClient?: string

  images?: Array<string>
}

export interface IIdeasByParentPriceVariations {
  price?: number

  quantity?: number
}
