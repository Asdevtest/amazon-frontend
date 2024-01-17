import { IStatusCreatedBy } from '../shared/created-by'

export interface IIdeaListItem {
  _id?: string
  title?: string
  status?: number
  variation?: boolean
  linksToMediaFiles?: Array<string>
  comments?: string
  buyerComment?: string
  productName?: string
  productLinks?: Array<string>
  criteria?: string
  quantity?: number
  price?: number
  fbaFee?: number
  approximatePrice?: number
  width?: number
  height?: number
  length?: number
  intervalStatusNew?: number
  intervalStatusOnCheck?: number
  intervalStatusSupplierSearch?: number
  intervalStatusSupplierFound?: number
  intervalStatusSupplierNotFound?: number
  intervalStatusProductCreating?: number
  intervalStatusAddingAsin?: number
  intervalStatusRejected?: number
  intervalsSum?: number
  dateStatusOnCheck?: string
  dateStatusSupplierSearch?: string
  dateStatusSupplierFound?: string
  dateStatusSupplierNotFound?: string
  dateStatusProductCreating?: string
  dateStatusAddingAsin?: string
  dateStatusFinished?: string
  dateStatusRejected?: string
  dateStatusClosed?: string
  suppliers?: Array<IIdeaListSuppliers>
  childProduct?: IIdeaListChildProduct
  order?: IIdeaListOrder
  parentProduct?: IIdeaListParentProduct
  requestsOnCheck?: Array<IIdeaListRequestsOnCheck>
  requestsOnFinished?: Array<IIdeaListRequestsOnCheck>
  createdAt?: string
  updatedAt?: string
}

export interface IIdeaListRequestsOnCheck {
  _id?: string

  humanFriendlyId?: number

  title?: string

  status?: string

  typeTask?: number

  proposals?: Array<IIdeaListProposals>

  executor?: IStatusCreatedBy
}

export interface IIdeaListParentProduct {
  _id?: string

  asin?: string

  skuByClient?: string

  amazonTitle?: string

  images?: Array<string>

  shopId?: string

  buyerId?: string

  barCode?: string
}

export interface IIdeaListOrder {
  id?: number

  _id?: string

  amount?: number

  status?: number

  createdAt?: string
}

export interface IIdeaListChildProduct {
  _id?: string

  asin?: string

  skuByClient?: string

  amazonTitle?: string

  images?: Array<string>

  shopId?: string

  buyerId?: string

  barCode?: string

  suppliers?: Array<IIdeaListSuppliers>
}

export interface IIdeaListSuppliers {
  _id?: string

  name?: string

  link?: string

  price?: number

  fbaFee?: number

  approximatePrice?: number

  amount?: number

  minlot?: number

  images?: Array<string>

  comment?: string

  batchDeliveryCostInDollar?: number

  productionTerm?: number

  batchTotalCostInDollar?: number

  priceVariations?: Array<IIdeaListPriceVariations>

  createdBy?: IStatusCreatedBy

  updatedAt?: string
}

export interface IIdeaListPriceVariations {
  price?: number

  quantity?: number
}

export interface IIdeaListProposals {
  _id?: string

  status?: string
}
