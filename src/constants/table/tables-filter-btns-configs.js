import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'

import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const AdminExchangeStatusesCategories = {
  all: 'all',
  created: 'created',
  new: 'new',
  supplierSearch: 'supplierSearch',
  inWork: 'inWork',
  supplierFound: 'supplierFound',
  supplierNotFound: 'supplierNotFound',
  priceHigher: 'priceHigher',
  complete: 'complete',
  rejected: 'rejected',
  completePriceNotAcceptable: 'completeSupplierNotFound',
  completeSupplierNotFound: 'completePriceNotAcceptable',
}

export const adminExchangeBtnsConfig = [
  {
    value: AdminExchangeStatusesCategories.created,
    label: () => t(TranslationKey.Created),
  },
  {
    value: AdminExchangeStatusesCategories.new,
    label: () => t(TranslationKey.New),
  },
  {
    value: AdminExchangeStatusesCategories.supplierSearch,
    label: () => t(TranslationKey['Supplier search']),
  },
  {
    value: AdminExchangeStatusesCategories.inWork,
    label: () => t(TranslationKey['In the work of a Buyer']),
  },
  {
    value: AdminExchangeStatusesCategories.supplierFound,
    label: () => t(TranslationKey['Supplier found by Buyer']),
  },
  {
    value: AdminExchangeStatusesCategories.supplierNotFound,
    label: () => t(TranslationKey['Supplier not found by Buyer']),
  },
  {
    value: AdminExchangeStatusesCategories.priceHigher,
    label: () => t(TranslationKey['Price is higher than MZC']),
  },
  {
    value: AdminExchangeStatusesCategories.complete,
    label: () => t(TranslationKey.Published),
  },
  {
    value: AdminExchangeStatusesCategories.rejected,
    label: () => t(TranslationKey.Rejected),
  },
  {
    value: AdminExchangeStatusesCategories.completeSupplierNotFound,
    label: () => t(TranslationKey['No supplier (completed by supervisor)']),
  },
  {
    value: AdminExchangeStatusesCategories.completePriceNotAcceptable,
    label: () => t(TranslationKey["The supplier's price does not fit"]),
  },
]

export const adminExchangeStatusesByCategory = {
  [AdminExchangeStatusesCategories.all]: [
    ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT],
    ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR],
    ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH],
    ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT],
    ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER],
    ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
    ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE],
    ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS],
    ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
    ProductStatusByKey[ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND],
    ProductStatusByKey[ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
  ],
  [AdminExchangeStatusesCategories.created]: [ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT]],
  [AdminExchangeStatusesCategories.new]: [ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR]],
  [AdminExchangeStatusesCategories.supplierSearch]: [ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]],
  [AdminExchangeStatusesCategories.inWork]: [ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT]],
  [AdminExchangeStatusesCategories.supplierFound]: [ProductStatusByKey[ProductStatus.BUYER_FOUND_SUPPLIER]],
  [AdminExchangeStatusesCategories.supplierNotFound]: [
    ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER],
  ],
  [AdminExchangeStatusesCategories.priceHigher]: [ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE]],
  [AdminExchangeStatusesCategories.complete]: [ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]],
  [AdminExchangeStatusesCategories.rejected]: [ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP]],
  [AdminExchangeStatusesCategories.completeSupplierNotFound]: [
    ProductStatusByKey[ProductStatus.COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ],
  [AdminExchangeStatusesCategories.completePriceNotAcceptable]: [
    ProductStatusByKey[ProductStatus.COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
  ],
}

export const AdminOrdersStatusesCategories = {
  all: 'all',
  readToProcess: 'readToProcess',
  atProcess: 'atProcess',
  paid: 'paid',
  trackNumberIssued: 'trackNumberIssued',
  inStock: 'inStock',
  canceledByBuyer: 'canceledByBuyer',
  needConfirming: 'needConfirming',
  canceledByClient: 'canceledByClient',
  verifyReceipt: 'verifyReceipt',
}

export const adminOrdersStatusesByCategory = {
  [AdminOrdersStatusesCategories.all]: [
    OrderStatusByKey[OrderStatus.READY_TO_PROCESS],
    OrderStatusByKey[OrderStatus.AT_PROCESS],
    OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER],
    OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED],
    OrderStatusByKey[OrderStatus.IN_STOCK],
    OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER],
    OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
    OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT],
    OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
  ],
  [AdminOrdersStatusesCategories.readToProcess]: [OrderStatusByKey[OrderStatus.READY_TO_PROCESS]],
  [AdminOrdersStatusesCategories.atProcess]: [OrderStatusByKey[OrderStatus.AT_PROCESS]],
  [AdminOrdersStatusesCategories.paid]: [OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]],
  [AdminOrdersStatusesCategories.trackNumberIssued]: [OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]],
  [AdminOrdersStatusesCategories.inStock]: [OrderStatusByKey[OrderStatus.IN_STOCK]],
  [AdminOrdersStatusesCategories.canceledByBuyer]: [OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]],
  [AdminOrdersStatusesCategories.needConfirming]: [OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]],
  [AdminOrdersStatusesCategories.canceledByClient]: [OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]],
  [AdminOrdersStatusesCategories.verifyReceipt]: [OrderStatusByKey[OrderStatus.VERIFY_RECEIPT]],
}

export const adminOrdersBtnsConfig = [
  {
    label: () => t(TranslationKey['Available for processing']),
    value: AdminOrdersStatusesCategories.readToProcess,
  },
  {
    label: () => t(TranslationKey['The buyer took the order']),
    value: AdminOrdersStatusesCategories.atProcess,
  },
  {
    label: () => t(TranslationKey['The buyer paid for the order']),
    value: AdminOrdersStatusesCategories.paid,
  },
  {
    label: () => t(TranslationKey['Track number issued']),
    value: AdminOrdersStatusesCategories.trackNumberIssued,
  },
  {
    label: () => t(TranslationKey['Came to the warehouse']),
    value: AdminOrdersStatusesCategories.inStock,
  },
  {
    label: () => t(TranslationKey['Return Order']),
    value: AdminOrdersStatusesCategories.canceledByBuyer,
  },

  {
    label: () => t(TranslationKey['Additional payment required']),
    value: AdminOrdersStatusesCategories.needConfirming,
  },
  {
    label: () => t(TranslationKey['Canceled by Client']),
    value: AdminOrdersStatusesCategories.canceledByClient,
  },
  {
    label: () => t(TranslationKey['Verify receipt']),
    value: AdminOrdersStatusesCategories.verifyReceipt,
  },
  {
    label: () => t(TranslationKey.All),
    value: AdminOrdersStatusesCategories.all,
  },
]
