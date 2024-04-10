import { ProductStatus } from '@typings/enums/product/product-status'

export const ProductStatusGroups = {
  allProducts: 'allProducts',
  rejectedBySupervisor: 'rejectedBySupervisor',
  onCheckWithSupervisor: 'onCheckWithSupervisor',
  atTheBuyerInWork: 'atTheBuyerInWork',
  searchComplete: 'searchComplete',
  supplierWasNotFound: 'supplierWasNotFound',
  supplierPriceDoesNotFit: 'supplierPriceDoesNotFit',
  paidByTheClient: 'paidByTheClient',
  productIsAppropriate: 'productIsAppropriate',
  buyerFoundSupplier: 'buyerFoundSupplier',
  searchForSupplierFromClient: 'searchForSupplierFromClient',
  productCheckFromResearcher: 'productCheckFromResearcher',
  temporarilyRejected: 'temporarilyRejected',
}

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
  // 25 - красный цвет
]

export const statusConfig = [
  {
    userInfoKey: ProductStatusGroups.allProducts,
    status: [ProductStatus.DEFAULT],
  },
  {
    userInfoKey: ProductStatusGroups.rejectedBySupervisor,
    status: [ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
  },
  {
    userInfoKey: ProductStatusGroups.atTheBuyerInWork,
    status: [
      ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
      ProductStatus.TO_BUYER_FOR_RESEARCH,
      ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT,
      ProductStatus.BUYER_PICKED_PRODUCT,
    ],
  },
  {
    userInfoKey: ProductStatusGroups.buyerFoundSupplier,
    status: [ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER, ProductStatus.BUYER_FOUND_SUPPLIER],
  },
  {
    userInfoKey: ProductStatusGroups.paidByTheClient,
    status: [ProductStatus.FROM_CLIENT_PAID_BY_CLIENT, ProductStatus.PURCHASED_PRODUCT],
  },
  {
    userInfoKey: ProductStatusGroups.productIsAppropriate,
    status: [ProductStatus.CHECKED_BY_SUPERVISOR],
  },
  {
    userInfoKey: ProductStatusGroups.searchComplete,
    status: [ProductStatus.COMPLETE_SUCCESS, ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  },
  {
    userInfoKey: ProductStatusGroups.supplierPriceDoesNotFit,
    status: [
      ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
      ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
      ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
      ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE,
    ],
  },
  {
    userInfoKey: ProductStatusGroups.supplierWasNotFound,
    status: [
      ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
      ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
      ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND,
      ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND,
    ],
  },
  {
    userInfoKey: ProductStatusGroups.searchForSupplierFromClient,
    status: [ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH],
  },
  {
    userInfoKey: ProductStatusGroups.productCheckFromResearcher,
    status: [ProductStatus.RESEARCHER_CREATED_PRODUCT],
  },
]

export const filtersFields = [
  'asin',
  'skuByClient',
  'amazonTitle',
  'strategyStatus',
  'amountInOrders',
  'inTransfer',
  'stockUSA',
  'boxAmounts',
  'sumStock',
  'amazon',
  'createdAt',
  'updatedAt',
  'profit',
  'fbafee',
  'status',
  'reservedSum',
  'sentToFbaSum',
  'fbaFbmStockSum',
  'ideasOnCheck',
  'stockCost',
  'purchaseQuantity',
  'ideasClosed',
  'ideasVerified',
  'tags',
  'redFlags',
  'createdBy',
  'buyer',
  'bsr',
]
