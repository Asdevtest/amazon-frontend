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
    value: null,
    userInfoKey: UserInfoStatusKeys.ALL_PRODUCTS,
  },
  {
    label: 'Rejected by Supervisor',
    value: 'rejectedBySupervisor',
    userInfoKey: UserInfoStatusKeys.REJECTED_BY_SUPERVISOR,
  },
  {
    label: "Buyer's product in progress",
    value: 'productInProgress',
    userInfoKey: UserInfoStatusKeys.AT_THE_BUYER_IN_WORK,
  },
  {
    label: 'Buyer found a supplier',
    value: 'buyerFoundSupplier',
    userInfoKey: UserInfoStatusKeys.BUYER_FOUND_SUPPLIER,
  },
  {
    label: 'Paid by the Client',
    value: 'paidByClient',
    userInfoKey: UserInfoStatusKeys.PAID_BY_THE_CLIENT,
  },
  {
    label: 'Product is appropriate',
    value: 'productAppropriate',
    userInfoKey: UserInfoStatusKeys.PRODUCT_IS_APPROPRIATE,
  },
  {
    label: 'Supplier found',
    value: 'supplierFoundFromSupervisor',
    userInfoKey: UserInfoStatusKeys.SEARCH_COMPLETE,
  },
  {
    label: 'Supplier price does not fit',
    value: 'supplierPriceNotFit',
    userInfoKey: UserInfoStatusKeys.SUPPLIER_PRICE_DOES_NOT_FIT,
  },
  {
    label: 'Supplier was not found',
    value: 'supplierNotFoundFromSupervisor',
    userInfoKey: UserInfoStatusKeys.SUPPLIER_WAS_NOT_FOUND,
  },
  {
    label: 'Search for supplier from client',
    value: 'searchSupplierFromClient',
    userInfoKey: UserInfoStatusKeys.SUPPLIER_SEARCH_FROM_CLIENT,
  },
  {
    label: 'Product check from a researcher',
    value: 'productCheckFromResearcher',
    userInfoKey: UserInfoStatusKeys.CHECKING_PRODUCT_FROM_RESEARCHER,
  },
  {
    label: 'Temporarily delayed',
    value: 'temporarilyDelayed',
    userInfoKey: UserInfoStatusKeys.TEMPORARILY_DELAYED,
  },
]
