import { ProductStatus } from '@typings/enums/product/product-status'

export const warningStatuses = [
  ProductStatus.BUYER_FOUND_SUPPLIER,
  ProductStatus.NEW_PRODUCT,
  ProductStatus.RESEARCHER_FOUND_SUPPLIER,
  ProductStatus.CHECKED_BY_SUPERVISOR,
  ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
  ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR,
  ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
  ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
  ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
  ProductStatus.RESEARCHER_CREATED_PRODUCT,
]
export const errorStatuses = [ProductStatus.TEMPORARILY_DELAYED]

export enum UserInfoStatusKeys {
  ALL_PRODUCTS = 'allProducts',
  REJECTED_BY_SUPERVISOR = 'rejectedBySupervisor',
  AT_THE_BUYER_IN_WORK = 'atTheBuyerInWork',
  BUYER_FOUND_SUPPLIER = 'buyerFoundSupplier',
  PAID_BY_THE_CLIENT = 'paidByTheClient',
  PRODUCT_IS_APPROPRIATE = 'productIsAppropriate',
  SEARCH_COMPLETE = 'searchComplete',
  SUPPLIER_PRICE_DOES_NOT_FIT = 'supplierPriceDoesNotFit',
  SUPPLIER_WAS_NOT_FOUND = 'supplierWasNotFound',
  VAC_FROM_CLIENT = 'vacFromClient',
  CHECKING_PRODUCT_FROM_RESEARCHER = 'checkingProductFromResearcher',
  TEMPORARILY_DELAYED = 'temporarilyDelayed',
  SUPPLIER_SEARCH_FROM_CLIENT = 'suplierSearchFromClient',
}

export const filterStatusConfig = [
  {
    label: 'All',
    value: 'all',
    userInfoKey: UserInfoStatusKeys.ALL_PRODUCTS,
  },
  {
    label: 'Rejected by supervisor',
    value: ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP,
    userInfoKey: UserInfoStatusKeys.REJECTED_BY_SUPERVISOR,
  },
  {
    label: "Buyer's product in progress",
    value: [
      ProductStatus.TO_BUYER_FOR_RESEARCH,
      ProductStatus.BUYER_PICKED_PRODUCT,
      ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
      ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT,
    ].join(','),
    userInfoKey: UserInfoStatusKeys.AT_THE_BUYER_IN_WORK,
  },
  {
    label: 'Buyer found a supplier',
    value: [ProductStatus.BUYER_FOUND_SUPPLIER, ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER].join(','),
    userInfoKey: UserInfoStatusKeys.BUYER_FOUND_SUPPLIER,
  },
  {
    label: 'Paid by the Client',
    value: [ProductStatus.PURCHASED_PRODUCT, ProductStatus.FROM_CLIENT_PAID_BY_CLIENT].join(','),
    userInfoKey: UserInfoStatusKeys.PAID_BY_THE_CLIENT,
  },
  {
    label: 'Product is appropriate',
    value: ProductStatus.CHECKED_BY_SUPERVISOR,
    userInfoKey: UserInfoStatusKeys.PRODUCT_IS_APPROPRIATE,
  },
  {
    label: 'Supplier found',
    value: [ProductStatus.COMPLETE_SUCCESS, ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS].join(','),
    userInfoKey: UserInfoStatusKeys.SEARCH_COMPLETE,
  },
  {
    label: 'Supplier price does not fit',
    value: [
      ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
      ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
      ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
      ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
    ].join(','),
    userInfoKey: UserInfoStatusKeys.SUPPLIER_PRICE_DOES_NOT_FIT,
  },
  {
    label: 'Supplier was not found',
    value: [
      ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
      ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND,
      ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
      ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND,
    ].join(','),
    userInfoKey: UserInfoStatusKeys.SUPPLIER_WAS_NOT_FOUND,
  },
  {
    label: 'Search for supplier from client',
    value: ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR,
    userInfoKey: UserInfoStatusKeys.SUPPLIER_SEARCH_FROM_CLIENT,
  },
  {
    label: 'Product check from a researcher',
    value: ProductStatus.RESEARCHER_CREATED_PRODUCT,
    userInfoKey: UserInfoStatusKeys.CHECKING_PRODUCT_FROM_RESEARCHER,
  },
  {
    label: 'Temporarily delayed',
    value: ProductStatus.TEMPORARILY_DELAYED,
    userInfoKey: UserInfoStatusKeys.TEMPORARILY_DELAYED,
  },
]
