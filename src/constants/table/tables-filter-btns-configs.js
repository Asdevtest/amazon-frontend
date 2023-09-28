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
    label: () => t(TranslationKey['In the work of a Bayer']),
  },
  {
    value: AdminExchangeStatusesCategories.supplierFound,
    label: () => t(TranslationKey['Supplier found by Bayer']),
  },
  {
    value: AdminExchangeStatusesCategories.supplierNotFound,
    label: () => t(TranslationKey['Supplier not found by Bayer']),
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

export const adminOrdersBtnsConfig = () => [
  {
    label: t(TranslationKey['Available for processing']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#007a07',
  },
  {
    label: t(TranslationKey['The buyer took the order']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['The buyer paid for the order']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Track number issued']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Came to the warehouse']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Return Order']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },

  {
    label: t(TranslationKey['Additional payment required']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Canceled by Client']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey['Verify receipt']),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
  {
    label: t(TranslationKey.All),
    color: 'rgb(15, 169, 20)',
    colorHover: '#009a07',
  },
]
