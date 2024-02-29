import { IdeaStatus } from '@typings/enums/idea-status'
import { ProductStatus } from '@typings/enums/product-status'

export const clientValidProductStatuses = [
  ProductStatus.NEW_PRODUCT,
  ProductStatus.CREATED_BY_CLIENT,
  ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS,
  ProductStatus.FROM_CLIENT_PAID_BY_CLIENT,
  ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND,
  ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
]

export const buyerValidProductStatuses = [
  ProductStatus.BUYER_PICKED_PRODUCT,
  ProductStatus.BUYER_FOUND_SUPPLIER,
  ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
  ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
]

export const ideaValidStatuses = [
  IdeaStatus.NEW,
  IdeaStatus.ON_CHECK,
  IdeaStatus.SUPPLIER_SEARCH,
  IdeaStatus.SUPPLIER_FOUND,
  IdeaStatus.SUPPLIER_NOT_FOUND,
]

export const allIdeaStatuses = [
  IdeaStatus.NEW,
  IdeaStatus.ON_CHECK,
  IdeaStatus.SUPPLIER_SEARCH,
  IdeaStatus.SUPPLIER_FOUND,
  IdeaStatus.SUPPLIER_NOT_FOUND,
  IdeaStatus.CARD_CREATING,
  IdeaStatus.ADDING_ASIN,
  IdeaStatus.VERIFIED,
  IdeaStatus.REJECTED,
  IdeaStatus.CLOSED,
]
