import { ProductStatus, ProductStatusByKey, ProductStatusGroups } from '@constants/product/product-status'

export const attentionStatuses = [
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

export const statusesList = [
  {
    userInfoKey: ProductStatusGroups.allProducts,
    status: ProductStatusByKey[ProductStatus.DEFAULT],
  },
  {
    userInfoKey: ProductStatusGroups.atTheBuyerInWork,
    status: ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT],
  },
  {
    userInfoKey: ProductStatusGroups.buyerFoundSupplier,
    status: ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
  },
  {
    userInfoKey: ProductStatusGroups.paidByTheClient,
    status: ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  },
  {
    userInfoKey: ProductStatusGroups.productIsAppropriate,
    status: ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR],
  },
  {
    userInfoKey: ProductStatusGroups.rejectedBySupervisor,
    status: ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
  },
  {
    userInfoKey: ProductStatusGroups.searchComplete,
    status: ProductStatusByKey[ProductStatus.SUPPLIER_FOUND],
  },
  {
    userInfoKey: ProductStatusGroups.supplierPriceDoesNotFit,
    status: ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
  },
  {
    userInfoKey: ProductStatusGroups.supplierWasNotFound,
    status: ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
  },
  {
    userInfoKey: ProductStatusGroups.onCheckWithSupervisor,
    status: ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT],
  },
]
